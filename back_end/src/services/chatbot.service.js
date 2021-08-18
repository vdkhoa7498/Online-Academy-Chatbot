require('dotenv').config();
const request = require('request');
const categoryService = require('./category.service');
const Course = require('../models/courses.model');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const SAMPLE_IMAGE = "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg";

function callSendAPI(sender_psid, response) {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    return new Promise((resolve, reject) => {
        request({
            "uri": "https://graph.facebook.com/v9.0/me/messages",
            "qs": { "access_token": PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
        }, (err, res, body) => {
            if (!err) {
                console.log('message sent!');
                resolve('success');
            } else {
                console.error("Unable to send message:" + err);
                reject(err);
            }
        });
    })
}

function getUsername(sender_psid) {
    return new Promise((resolve, reject) => {
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
            "method": "GET"
        }, (err, res, body) => {
            console.log(body);
            if (!err) {
                let bodyParsed = JSON.parse(body);
                let username = `${bodyParsed.last_name} ${bodyParsed.first_name}`;
                resolve(username);
            } else {
                console.error("Unable to send message:" + err);
                reject(err);
            }
        });
    })
}

async function getAllCategories() {
    let allCategories = await categoryService.getAllCategories();
    // Just get categories that have no parent
    let allParentCategories = [];
    allCategories.forEach(category => {
        if (category.parentId == null) {
            allParentCategories.push(category);
        }
    })

    // Create template elements
    let templateElements = [];
    allParentCategories.forEach(category => {
        templateElements.push({
            title: category.name,
            buttons: [{
                type: "postback",
                title: "Xem " + category.name,
                payload: `sub_category=${category._id}`
            }]
        });
    });

    // Create response
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": JSON.stringify(templateElements)
            }
        }
    };
    return response;
}

async function getAllSubCategories(categoryId) {
    let allSubCategories = await categoryService.getAllSubCategories(categoryId);

    // Create template elements
    let templateElements = [];
    allSubCategories.forEach(category => {
        templateElements.push({
            title: category.name,
            buttons: [{
                type: "postback",
                title: "Xem " + category.name,
                payload: `show_list=${category._id},${category.name}`
            }]
        });
    });

    // Create response
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": JSON.stringify(templateElements)
            }
        }
    };
    return response;
}

async function getListCoursesByQuery(query) {
    let templateElements = [];
    const listCourses = await Course.find({ $or: [{ title: new RegExp(query, "i") }] });
    listCourses.forEach(course => {
        templateElements.push({
            title: course.title,
            image_url: course.picture,
            buttons: [{
                type: "postback",
                title: "Xem " + course.title,
                payload: `show_detail=${course._id}`
            }]
        });
    });
    console.log(templateElements);

    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": JSON.stringify(templateElements)
            }
        }
    };
    return response;
}

async function getListCoursesBySubCategory(categoryId) {
    let templateElements = [];
    const listCourses = await Course.find({ categoryId: categoryId });
    listCourses.forEach(course => {
        templateElements.push({
            title: course.title,
            image_url: course.picture,
            buttons: [{
                type: "postback",
                title: "Xem " + course.title,
                payload: `show_detail=${course._id}`
            }]
        });
    });

    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": JSON.stringify(templateElements)
            }
        }
    };
    return response;
}

function getCourseDetailResponse(course) {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": `${course.title}`,
                        "image_url": `${course.picture}`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Quay lại menu chính",
                                "payload": "get_started",
                            }
                        ],
                    }
                ]
            }
        }
    };
    return response;
}

let handleGetStarted = (sender_psid) => {
    return new Promise(async(resolve, reject) => {
        try {
            let username = await getUsername(sender_psid);
            let response1 = { "text": `Chào mừng bạn ${username} đã đến với Online Academy, bạn có thể nhập từ khóa để tìm kiếm khóa học hoặc duyệt khóa học theo những danh mục sau:` }
            let response2 = await getAllCategories();
            await callSendAPI(sender_psid, response1);
            await callSendAPI(sender_psid, response2);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetListCoursesByQuery = (sender_psid, query) => {
    return new Promise(async(resolve, reject) => {
        try {
            let response1 = { "text": `Danh sách khóa học ứng với từ khóa "${query}"` }
            let response2 = await getListCoursesByQuery(query);
            await callSendAPI(sender_psid, response1);
            await callSendAPI(sender_psid, response2);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetSubCategories = (sender_psid, categoryId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let response1 = { "text": `Đây là những danh mục con` }
            let response2 = await getAllSubCategories(categoryId);
            await callSendAPI(sender_psid, response1);
            await callSendAPI(sender_psid, response2);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetListCoursesBySubCategory = (sender_psid, subCategory) => {
    const segments = subCategory.split(',');

    return new Promise(async(resolve, reject) => {
        try {
            let response1 = { "text": `Danh sách khóa học thuộc danh mục "${segments[1]}"` }
            let response2 = await getListCoursesBySubCategory(segments[0]);
            await callSendAPI(sender_psid, response1);
            await callSendAPI(sender_psid, response2);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetCourseDetail = (sender_psid, courseId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let course = await Course.findOne({ _id: courseId });
            let response1 = getCourseDetailResponse(course);
            let response2 = { "text": `${course.shortDescription}` }
            await callSendAPI(sender_psid, response1);
            await callSendAPI(sender_psid, response2);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleGetStarted,
    handleGetListCoursesByQuery,
    handleGetSubCategories,
    handleGetListCoursesBySubCategory,
    handleGetCourseDetail
}