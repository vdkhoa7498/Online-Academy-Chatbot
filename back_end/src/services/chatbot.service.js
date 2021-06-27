require('dotenv').config();
const request = require('request');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

function callSendAPI(sender_psid, response) {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }
    
    request({
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

function getAllCategories() {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Nghệ thuật",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Xem Nghệ thuật",
                                "payload": "show_list",
                            }
                        ],
                    },
                    {
                        "title": "Nghệ thuật",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Xem Nghệ thuật",
                                "payload": "show_list",
                            }
                        ],
                    },
                    {
                        "title": "Nghệ thuật",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Xem Nghệ thuật",
                                "payload": "show_list",
                            }
                        ],
                    }
                ]
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
                        "image_url": "https://ik.imagekit.io/5tq70vhft/cropped756619698302919104_tQbaIrNm0.jpg",
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
                        "image_url": "https://ik.imagekit.io/5tq70vhft/cropped756619698302919104_tQbaIrNm0.jpg",
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
                        "image_url": "https://ik.imagekit.io/5tq70vhft/cropped756619698302919104_tQbaIrNm0.jpg",
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
                        "subtitle": "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tiết kiệm được nhiều chi phí.",
                        "image_url": "https://ik.imagekit.io/5tq70vhft/cropped756619698302919104_tQbaIrNm0.jpg",
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
            let response2 = getAllCategories();
            callSendAPI(sender_psid, response1);
            callSendAPI(sender_psid, response2);
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
            callSendAPI(sender_psid, response1);
            callSendAPI(sender_psid, response2);
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
            callSendAPI(sender_psid, response1);
            callSendAPI(sender_psid, response2);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetCourseDetail = (sender_psid) => {
    return new Promise(async(resolve, reject) => {
        try {
            let response = getCourseDetail();
            callSendAPI(sender_psid, response);
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