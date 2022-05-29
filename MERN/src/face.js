'use strict';

const axios = require('axios').default;

let subscriptionKey = "ea65a2616e5f48cfb726dadf6650de69"
let endpoint = 'https://demofaceapiinstance2901.cognitiveservices.azure.com//face/v1.0/detect'


axios({
    method: 'post',
    url: endpoint,
    params : {
        returnFaceId: true,
        returnFaceLandmarks: false,
        returnFaceAttributes: 'age,emotion'
    },
    data: {
        url: imageUrl,
    },
    headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
}).then(function (response) {
    console.log('Status text: ' + response.status)
    console.log('Status text: ' + response.statusText)
    console.log()
    //console.log(response.data)
    response.data.forEach((face) => {
      console.log('Face ID: ' + face.faceId)
      console.log('Age: ' + face.faceAttributes.age)
      console.log('Emotion: ' + JSON.stringify(face.faceAttributes.emotion))
      console.log()
    });
}).catch(function (error) {
    console.log(error)
});
