const functions = require('firebase-functions'); //import
const line = require('@line/bot-sdk');
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();






// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.line = functions.https.onRequest(async(request, response) => {
 const client = new line.Client({
     channelAccessToken:"4vG6mNtIJSX/H3cK7hqPDP5QlnbxsskYsy5g3aKRq5aaU4NIyQgBFi4+gEs9X8eLHrSIK/meunO8dAlFp7xKyXBiSgWejktoUFtlD5kM/IryL8TfF1/orOwrC4JgkWU6iCE71fg7gwbI1aC/u11d0AdB04t89/1O/w1cDnyilFU=",
     channelSecret:"75fa048c2c888df77ccf77ccf7daa37c"
 })

    const body = request.body;
    const events = body.events;

    console.log("body",body)
    console.log("events",events)

    let messages = []
    const querSnapShot = await firestore.collection("messages").get();
    querSnapShot.forEach(doc=>{
        const data = doc.data();
        messages[doc.id] = data;
    })

    function initMap() {
        var opts = {
          zoom: 15,
          center: new google.maps.LatLng(35.6807527,139.7670716)
        };
        var map = new google.maps.Map(document.getElementById("map"), opts);
    }

    // function getImage(messageId) {
    //     var url = "https://api.line.me/v2/bot/message/" + messageId + "/content";
    //     var headers = {
    //       "Content-Type" : "application/json; charset=UTF-8",
    //       'Authorization': 'Bearer ' + access_token,
    //     };
      
    //     var options = {
    //       "method" : "get",
    //       "headers" : headers,
    //     };
      
    //     return UrlFetchApp.fetch(url, options);    
    // }


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

            const res = await client.replyMessage(replyToken,messages.flex.test2)
            console.log(messages.test.test)
            // const replyMessage = {
            //     type: "flex",
            //     altText: "this is a flex message",
            //     contents: {
            //         "type": "carousel",
            //         "contents": [
            //           {
            //             "type": "bubble",
            //             "body": {
            //               "type": "box",
            //               "layout": "vertical",
            //               "contents": [
            //                 {
            //                   "type": "image",
            //                   "url": "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip1.jpg",
            //                   "size": "full",
            //                   "aspectMode": "cover",
            //                   "aspectRatio": "2:3",
            //                   "gravity": "top"
            //                 },
            //                 {
            //                   "type": "box",
            //                   "layout": "vertical",
            //                   "contents": [
            //                     {
            //                       "type": "box",
            //                       "layout": "vertical",
            //                       "contents": [
            //                         {
            //                           "type": "text",
            //                           "text": "Brown's T-shirts",
            //                           "size": "xl",
            //                           "color": "#ffffff",
            //                           "weight": "bold"
            //                         }
            //                       ]
            //                     },
            //                     {
            //                       "type": "box",
            //                       "layout": "baseline",
            //                       "contents": [
            //                         {
            //                           "type": "text",
            //                           "text": "¥35,800",
            //                           "color": "#ebebeb",
            //                           "size": "sm",
            //                           "flex": 0
            //                         },
            //                         {
            //                           "type": "text",
            //                           "text": "¥75,000",
            //                           "color": "#ffffffcc",
            //                           "decoration": "line-through",
            //                           "gravity": "bottom",
            //                           "flex": 0,
            //                           "size": "sm"
            //                         }
            //                       ],
            //                       "spacing": "lg"
            //                     },
            //                     {
            //                       "type": "box",
            //                       "layout": "vertical",
            //                       "contents": [
            //                         {
            //                           "type": "filler"
            //                         },
            //                         {
            //                           "type": "box",
            //                           "layout": "baseline",
            //                           "contents": [
            //                             {
            //                               "type": "filler"
            //                             },
            //                             {
            //                               "type": "icon",
            //                               "url": "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip14.png"
            //                             },
            //                             {
            //                               "type": "text",
            //                               "text": "Add to cart",
            //                               "color": "#ffffff",
            //                               "flex": 0,
            //                               "offsetTop": "-2px"
            //                             },
            //                             {
            //                               "type": "filler"
            //                             }
            //                           ],
            //                           "spacing": "sm"
            //                         },
            //                         {
            //                           "type": "filler"
            //                         }
            //                       ],
            //                       "borderWidth": "1px",
            //                       "cornerRadius": "4px",
            //                       "spacing": "sm",
            //                       "borderColor": "#ffffff",
            //                       "margin": "xxl",
            //                       "height": "40px"
            //                     }
            //                   ],
            //                   "position": "absolute",
            //                   "offsetBottom": "0px",
            //                   "offsetStart": "0px",
            //                   "offsetEnd": "0px",
            //                   "backgroundColor": "#03303Acc",
            //                   "paddingAll": "20px",
            //                   "paddingTop": "18px"
            //                 },
            //                 {
            //                   "type": "box",
            //                   "layout": "vertical",
            //                   "contents": [
            //                     {
            //                       "type": "text",
            //                       "text": "SALE",
            //                       "color": "#ffffff",
            //                       "align": "center",
            //                       "size": "xs",
            //                       "offsetTop": "3px"
            //                     }
            //                   ],
            //                   "position": "absolute",
            //                   "cornerRadius": "20px",
            //                   "offsetTop": "18px",
            //                   "backgroundColor": "#ff334b",
            //                   "offsetStart": "18px",
            //                   "height": "25px",
            //                   "width": "53px"
            //                 }
            //               ],
            //               "paddingAll": "0px"
            //             }
            //           },
            //           {
            //             "type": "bubble",
            //             "body": {
            //               "type": "box",
            //               "layout": "vertical",
            //               "contents": [
            //                 {
            //                   "type": "image",
            //                   "url": "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip2.jpg",
            //                   "size": "full",
            //                   "aspectMode": "cover",
            //                   "aspectRatio": "2:3",
            //                   "gravity": "top"
            //                 },
            //                 {
            //                   "type": "box",
            //                   "layout": "vertical",
            //                   "contents": [
            //                     {
            //                       "type": "box",
            //                       "layout": "vertical",
            //                       "contents": [
            //                         {
            //                           "type": "text",
            //                           "text": "Cony's T-shirts",
            //                           "size": "xl",
            //                           "color": "#ffffff",
            //                           "weight": "bold"
            //                         }
            //                       ]
            //                     },
            //                     {
            //                       "type": "box",
            //                       "layout": "baseline",
            //                       "contents": [
            //                         {
            //                           "type": "text",
            //                           "text": "¥35,800",
            //                           "color": "#ebebeb",
            //                           "size": "sm",
            //                           "flex": 0
            //                         },
            //                         {
            //                           "type": "text",
            //                           "text": "¥75,000",
            //                           "color": "#ffffffcc",
            //                           "decoration": "line-through",
            //                           "gravity": "bottom",
            //                           "flex": 0,
            //                           "size": "sm"
            //                         }
            //                       ],
            //                       "spacing": "lg"
            //                     },
            //                     {
            //                       "type": "box",
            //                       "layout": "vertical",
            //                       "contents": [
            //                         {
            //                           "type": "filler"
            //                         },
            //                         {
            //                           "type": "box",
            //                           "layout": "baseline",
            //                           "contents": [
            //                             {
            //                               "type": "filler"
            //                             },
            //                             {
            //                               "type": "icon",
            //                               "url": "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip14.png"
            //                             },
            //                             {
            //                               "type": "text",
            //                               "text": "Add to cart",
            //                               "color": "#ffffff",
            //                               "flex": 0,
            //                               "offsetTop": "-2px"
            //                             },
            //                             {
            //                               "type": "filler"
            //                             }
            //                           ],
            //                           "spacing": "sm"
            //                         },
            //                         {
            //                           "type": "filler"
            //                         }
            //                       ],
            //                       "borderWidth": "1px",
            //                       "cornerRadius": "4px",
            //                       "spacing": "sm",
            //                       "borderColor": "#ffffff",
            //                       "margin": "xxl",
            //                       "height": "40px"
            //                     }
            //                   ],
            //                   "position": "absolute",
            //                   "offsetBottom": "0px",
            //                   "offsetStart": "0px",
            //                   "offsetEnd": "0px",
            //                   "backgroundColor": "#9C8E7Ecc",
            //                   "paddingAll": "20px",
            //                   "paddingTop": "18px"
            //                 },
            //                 {
            //                   "type": "box",
            //                   "layout": "vertical",
            //                   "contents": [
            //                     {
            //                       "type": "text",
            //                       "text": "SALE",
            //                       "color": "#ffffff",
            //                       "align": "center",
            //                       "size": "xs",
            //                       "offsetTop": "3px"
            //                     }
            //                   ],
            //                   "position": "absolute",
            //                   "cornerRadius": "20px",
            //                   "offsetTop": "18px",
            //                   "backgroundColor": "#ff334b",
            //                   "offsetStart": "18px",
            //                   "height": "25px",
            //                   "width": "53px"
            //                 }
            //               ],
            //               "paddingAll": "0px"
            //             }
            //           }
            //         ]
            //       }
            //}
            console.log(replyMessage)
            client.replyMessage(replyToken,replyMessage)
            .then(res=>{
                console.log(res)
                response.status(200).send('OK');
            }).catch(err=>{
                console.log(err)
                response.status(400).send('Error');
            })
            //新規でドキュメントID保存
            firestore.doc("users/"+ userId).set({
                userId:userId,
                mailaddress:"",
                state:0
            })

        }else if(type=="message"){
            if(message.type=="text"){//テキスト
                
                const newMessage = "メールアドレスを入力して下さい";
                const Message2 = "メールアドレスを登録してもよろしいですか？";
                const Message3 = "メールアドレスを登録しました。";
                var registAddress = ""
                const doc = await firestore.doc("users/"+ userId).get();
                const data = doc.data();
                console.log(data)

                var replyMessage = {
                    type:"text",
                    text:""
                }
                var replyMessage2 = {
                    type:"text",
                    text:""
                }
                
                if(message.text=="メールアドレス"　|| message.text=="mailaddress"){//テキスト
                    console.log(0)
                    replyMessage = {
                        type:"text",
                        text:newMessage
                    }

                    firestore.doc("users/" + userId).set({
                        state:1
                    },{merge:true})//第２引数でマージオプション
                
                // if(data.state == 0){
                //     console.log(0)
                //     replyMessage = {
                //         type:"text",
                //         text:newMessage
                //     }

                //     firestore.doc("users/" + userId).set({
                //         state:1
                //     },{merge:true})//第２引数でマージオプション
                }else if(message.text=="予約"){//テンプレート
                    //var today = new Date();
                    //日時選択
                    replyMessage = {
                        type: "template",
                        altText: "this is a buttons template",
                        template: {
                            type: "buttons",
                            title: "空いてる日程教えてよ",
                            text: "Please select",
                            actions: [
                                {
                                  type: "datetimepicker",
                                  label: "いいよ",
                                  mode: "datetime",
                                  data: "action=datetemp&selectId=1"
                                },
                                {
                                  type: "postback",
                                  label: "やっぱりやめたい",
                                  data: "action=cancel&selectId=2"
                                },
                            ]
                        }
                    }
                 

                }else if(data.state == 2 && message.text=="はい"){//メールアドレス登録
                    replyMessage = {
                        type:"text",
                        text:Message3
                    }

                    firestore.doc("users/" + userId).set({
                        state:0
                    },{merge:true})//第２引数でマージオプション

                }else if(data.state == 2 && message.text=="いいえ"){//メールアドレス削除
                    replyMessage = {
                        type:"text",
                        text:newMessage
                    }

                    firestore.doc("users/" + userId).set({
                        state:0,
                        mailaddress:""
                    },{merge:true})//第２引数でマージオプション

                   
                }else if(data.state == 1){//メールアドレス入力
                    replyMessage = {
                        type:"text",
                        text:Message2
                    }

                    //registAddress = message.text

                    replyMessage2 = {
                        type: "flex",
                        altText: "this is a flex message",
                        contents: {
                            "type": "bubble",
                            "body": {
                              "type": "box",
                              "layout": "horizontal",
                              "spacing": "md",
                              "contents": [
                                {
                                  "type": "button",
                                  "style": "primary",
                                  "action": {
                                    "type":"message",
                                    "label": "はい",
                                    "text":"はい"
                                  }
                                },
                                {
                                  "type": "button",
                                  "style": "secondary",
                                  "action": {
                                    "type":"message",
                                    "label": "いいえ",
                                    "text":"いいえ"
                                  }
                                }
                              ]
                            }
                        }
                    }

                    firestore.doc("users/" + userId).set({
                        state:2,
                        mailaddress:message.text
                    },{merge:true})//第２引数でマージオプション
                }else{
                    replyMessage = {
                        type:"text",
                        text:message.text
                    }

                    firestore.doc("users/" + userId).set({
                        state:0,
                        mailaddress:""
                    },{merge:true})//第２引数でマージオプション
                }

              

                // const doc = await firestore.doc("users/U1ed2119c758aa73fd5bd23977ae1fe36").get();
                // const data = doc.data();

                //firestore.doc("users/" + userId).delete();

                //firestore.collection("users").doc(userId).set({  
                // firestore.doc("users/" + userId).set({
                //     text:message.text
                // },{merge:true})//第２引数でマージオプション

                // let tmp =""
                // const querySnapShot = await firestore.collection("users").get();
                // querySnapShot.forEach(doc=>{
                //     let data = doc.data();
                //     tmp += data.text;
                // })

                // const replyMessage = {
                //     type:"text",
                //     text:tmp
                // }

                //const doc2 = await firestore.doc("users/"+ userId).get();
                //const data2 = doc2.data();

                if(data.state == 1){
                     //2件返信
                     client.replyMessage(replyToken,[replyMessage,replyMessage2])
                     .then(res=>{
                         console.log(res)
                         response.status(200).send('OK');
                     }).catch(err=>{
                         console.log(err)
                         response.status(400).send('Error');
                     })
                }else{
                     //返信
                     client.replyMessage(replyToken,replyMessage)
                     .then(res=>{
                         console.log(res)
                         response.status(200).send('OK');
                     }).catch(err=>{
                         console.log(err)
                         response.status(400).send('Error');
                     })
                   
                }
            }else if(message.type=="image"){//画像
                const replyMessage = {
                    type:"image",
                    //image: getImage(json.events[0].message.id)
                    originalContentUrl: 'https://i.gyazo.com/e772c3b48a07716226f7184d7f417cda.png',
                    previewImageUrl: 'https://i.gyazo.com/e772c3b48a07716226f7184d7f417cda.png'
                }
                client.replyMessage(replyToken,replyMessage)
                .then(res=>{
                    console.log(res)
                    response.status(200).send('OK');
                }).catch(err=>{
                    console.log(err)
                    response.status(400).send('Error');
                })
            }else if(message.type=="sticker"){//スタンプ
                const replyMessage = {
                    type:"sticker",
                    packageId:"1",
                    stickerId:"1"
                }
                client.replyMessage(replyToken,replyMessage)
                .then(res=>{
                    console.log(res)
                    response.status(200).send('OK');
                }).catch(err=>{
                    console.log(err)
                    response.status(400).send('Error');
                })
            }else if(message.type=="location"){//位置情報
                const replyMessage = {
                    "type": "location",
                    "title": "my location",
                    "address": "〒586-0048 大阪府河内長野市三日市町３２−１",
                    "latitude":  -34.397,
                    "longitude": 150.644
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


