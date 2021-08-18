require('dotenv').config();
const request = require('request');
const chatbotService = require('../services/chatbot.service');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

let postWebhook = (req, res) => {
    let body = req.body;

    if (body.object === 'page') {
        body.entry.forEach(function (entry) {
            
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
            
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
};

let getWebhook = (req, res) => {

    let query = req._parsedUrl.query;
    let splitedQuery = splitQuery(query);

    let mode = splitedQuery['hub_mode'];
    let token = splitedQuery['hub_verify_token'];
    let challenge = splitedQuery['hub_challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFYED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.status(404).send('Something wrong here');
    }
}

// Handles messages events (Search)
async function handleMessage(sender_psid, received_message) {
    
    if (received_message.text) {
        await chatbotService.handleGetListCoursesByQuery(sender_psid, received_message.text);
    }
}

// Handles messaging_postbacks events (Button clicked)
async function handlePostback(sender_psid, received_postback) {
    
    let payload = received_postback.payload;
    let keyValuePair = payload.split('=');

    switch (keyValuePair[0]) {
        case 'get_started':
            await chatbotService.handleGetStarted(sender_psid);
            break;
        case 'sub_category':
            await chatbotService.handleGetSubCategories(sender_psid, keyValuePair[1]);
            break;
        case 'show_list':
            await chatbotService.handleGetListCoursesBySubCategory(sender_psid, keyValuePair[1]);
            break;
        case 'show_detail':
            await chatbotService.handleGetCourseDetail(sender_psid);
            break;
        default:
            let response = { "text": `Xin lỗi, tôi không hiểu ${payload}.` };
            callSendApiError(sender_psid, response);
    }
}

// Sends response messages via the Send API
function callSendApiError(sender_psid, response) {
    
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }
    
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
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

function splitQuery(query) {
    let result = {};
    let keyValueStrings = query.split('&');
    keyValueStrings.forEach(str => {
        let keyValuePair = str.split('=');
        keyValuePair[0] = keyValuePair[0].replace('.', '_');
        console.log(keyValuePair);
        result[keyValuePair[0]] = keyValuePair[1];
    })
    return result;
}

module.exports = {
    getWebhook: getWebhook,
    postWebhook: postWebhook
};