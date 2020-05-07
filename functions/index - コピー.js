const functions = require('firebase-functions'); //import
const line = require('@line/bot-sdk');



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.line = functions.https.onRequest((request, response) => {
 const client = new line.Client({
     channelAccessToken:"4vG6mNtIJSX/H3cK7hqPDP5QlnbxsskYsy5g3aKRq5aaU4NIyQgBFi4+gEs9X8eLHrSIK/meunO8dAlFp7xKyXBiSgWejktoUFtlD5kM/IryL8TfF1/orOwrC4JgkWU6iCE71fg7gwbI1aC/u11d0AdB04t89/1O/w1cDnyilFU=",
     channelSecret:"75fa048c2c888df77ccf77ccf7daa37c"
 })

    const body = request.body;
    const events = body.events;

    console.log("body",body)
    console.log("events",events)

    for(let event of events){
        // const replayToken = event.replayToken;
        // const type = event.type;
        // const source = event.source;
        // const userId = sorce.userId;
        // const message = event.message;

        const{
            replyToken,
            type,
            source:{
                userId
            },
            message
        } = event
        if(type=="follow"){

        }else if(type=="message"){
            if(message.type=="text"){
                const replyMessage = {
                    type:"text",
                    text:message.text
                }
                client.replyMessage(replyToken,replyMessage)
                .then(res=>{
                    console.log(res)
                    response.status(200).send('OK');
                }).catch(err=>{
                    console.log(err)
                    response.status(400).send('Error');
                })
            }
        }
    }

    // response.status(200).send("Hello from Firebase!");
});
