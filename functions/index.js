const functions = require('firebase-functions');
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.status(200).send("Hello Jeerawuth!!!");
})