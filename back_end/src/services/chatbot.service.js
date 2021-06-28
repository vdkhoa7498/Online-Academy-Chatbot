require('dotenv').config();
const request = require('request');
const categoryService = require('./category.service');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const SAMPLE_IMAGE = "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg";

async function callSendAPI(sender_psid, response) {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }
    
    await request({
        "uri": "https://graph.facebook.com/v9.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
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
    console.log(allParentCategories);

    // Create template elements
    let templateElements = [];
    allParentCategories.forEach(category => {
        templateElements.push({
            title: category.name,
            buttons: [{
                type: "postback",
                title: "Xem " + category.name,
                payload: "show_list"
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

function getListCourses() {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Tự học guitar",
                        "image_url": SAMPLE_IMAGE,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Xem Tự học guitar",
                                "payload": "show_detail",
                            }
                        ],
                    },
                    {
                        "title": "Tự học guitar",
                        "image_url": SAMPLE_IMAGE,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Xem Tự học guitar",
                                "payload": "show_detail",
                            }
                        ],
                    },
                    {
                        "title": "Tự học guitar",
                        "image_url": SAMPLE_IMAGE,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Xem Tự học guitar",
                                "payload": "show_detail",
                            }
                        ],
                    }
                ]
            }
        }
    };
    return response;
}

function getCourseDetail() {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Tự học guitar",
                        "image_url": SAMPLE_IMAGE,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Quay lại",
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
            let response2 = getListCourses();
            await callSendAPI(sender_psid, response1);
            await callSendAPI(sender_psid, response2);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetListCoursesByCategory = (sender_psid, category) => {
    return new Promise(async(resolve, reject) => {
        try {
            let response1 = { "text": `Danh sách khóa học thuộc danh mục "${category}"` }
            let response2 = getListCourses();
            await callSendAPI(sender_psid, response1);
            await callSendAPI(sender_psid, response2);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetCourseDetail = (sender_psid) => {
    return new Promise(async(resolve, reject) => {
        try {
            let response1 = getCourseDetail();
            let response2 = { "text": "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tiết kiệm được nhiều chi phí." }
            await callSendAPI(sender_psid, response1);
            await callSendAPI(sender_psid, response2);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleGetStarted: handleGetStarted,
    handleGetListCoursesByQuery: handleGetListCoursesByQuery,
    handleGetListCoursesByCategory: handleGetListCoursesByCategory,
    handleGetCourseDetail: handleGetCourseDetail
}