require('dotenv').config();
const request = require('request');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

let postWebhook = (req, res) => {
    let body = req.body;

    if (body.object === 'page') {
        body.entry.forEach(function (entry) {
            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
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

// Handles messages events
function handleMessage(sender_psid, received_message) {
    let response;

    if (received_message.text) {
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
        }
    } else if (received_message.attachments) {
        let attachment_url = received_message.attachments[0].payload.url;
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": "Is this the right picture?",
                            "subtitle": "Tap a button to answer.",
                            "image_url": attachment_url,
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Yes!",
                                    "payload": "yes",
                                },
                                {
                                    "type": "postback",
                                    "title": "No!",
                                    "payload": "no",
                                }
                            ],
                        },
                        {
                            "title": "Is this the right picture?",
                            "subtitle": "Tap a button to answer.",
                            "image_url": attachment_url,
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Yes!",
                                    "payload": "yes",
                                },
                                {
                                    "type": "postback",
                                    "title": "No!",
                                    "payload": "no",
                                }
                            ],
                        },
                        {
                            "title": "Is this the right picture?",
                            "subtitle": "Tap a button to answer.",
                            "image_url": attachment_url,
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Yes!",
                                    "payload": "yes",
                                },
                                {
                                    "type": "postback",
                                    "title": "No!",
                                    "payload": "no",
                                }
                            ],
                        },
                    ]
                }
            }
        }
    }

    callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
    let response;

    let payload = received_postback.payload;

    switch (payload) {
        case 'yes':
            response = { "text": "Thanks!" };
            break;
        case 'no':
            response = { "text": "Oops, try sending another image." };
            break;
        case 'get_started':
            response = { "text": "Chào mừng bạn ABC đã đến với Online Academy." };
            break;
        default:
            response = { "text": `Xin lỗi, tôi không hiểu ${payload}.` };
    }

    callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    
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