// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
var db = admin.firestore();

exports.getUserByName = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    // const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    var peopleRef = db.collection('people').doc(req.query.name);
    peopleRef.get()
        .then(doc => {
            console.log('Doc is ', doc.data());
            return res.status(200).json(doc.data());
        })
        .catch(err => {
            console.log('Oops! Something went wrong.');
            throw new Error(err)
        });

});