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
    var peopleRef = db.collection('people').doc(req.body.name);
    peopleRef.get().then(doc => {
            console.log('Doc is ', doc.data());
            return res.status(200).json(doc.data());
        })
        .catch(err => {
            console.log('Oops! Something went wrong.');
            throw new Error(err);
    });
});

exports.getUserByMajor = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    // const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    var peopleRef = db.collection('people');
    var data;
    var query = peopleRef.where('major','==',req.body.major)
    query.get().then(snapshot =>{
      if(snapshot.empty){
        console.log('No documents found');
      }
      else{
        data = snapshot.docs.map(documentSnapshot =>{
          return documentSnapshot.data();
        })
       console.log('Doc is', data);
      }
      return res.status(200).json(data);
    })
      .catch(err => {
            console.log('Oops! Something went wrong.');
            throw new Error(err);
      });
});

exports.getUserByCollege = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    // const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    var peopleRef = db.collection('people');
    var data;
    var query = peopleRef.where('college','==',req.body.college)
    query.get().then(snapshot =>{
      if(snapshot.empty){
        console.log('No documents found');
      }
      else{
        data = snapshot.docs.map(documentSnapshot =>{
          return documentSnapshot.data();
        })
       console.log('Doc is', data);
      }
      return res.status(200).json(data);
    })
      .catch(err => {
            console.log('Oops! Something went wrong.');
            throw new Error(err);
      });
});

exports.getUserByCollegeAndMajor = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    // const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    var peopleRef = db.collection('people');
    var data;
    var query = peopleRef.where('college','==',req.body.college).where('major','==',req.body.major)
    query.get().then(snapshot =>{
      if(snapshot.empty){
        console.log('No documents found');
      }
      else{
        data = snapshot.docs.map(documentSnapshot =>{
          return documentSnapshot.data();
        })
       console.log('Doc is', data);
      }
      return res.status(200).json(data);
    })
      .catch(err => {
            console.log('Oops! Something went wrong.');
            throw new Error(err);
      });
});
exports.getUserBySkill = functions.https.onRequest((req,res) => {
  var peopleRef = db.collection('people');

  var data;
  var query = peopleRef.where('skill.'+ req.body.skill[i],'>',0).orderBy('skill.'+ req.body.skill)
//  console.log('query is', query);
  query.get().then(snapshot =>{
    if(snapshot.empty){
     console.log('No documents found');
    }
    else{
      data = snapshot.docs.map(documentSnapshot =>{
       return documentSnapshot.data();
      })
      console.log('Doc is', data);
   }
   return res.status(200).json(data);
 })
    .catch(err =>{
     console.log('Oops! Something went wrong.');
      throw new Error(err);
  });
});

exports.getUserByMultipleSkill = functions.https.onRequest((req,res) =>{
  var peopleRef = db.collection('people');
  var data;
  var query = peopleRef;
  //console.log('req',req.body);
  var skill = req.body.user.skill;
  var college = req.body.user.college;
  var major = req.body.user.major;


  //console.log('skill',skill);
  if(skill.length > 0){
  for(i in skill){
   query  = query.where('skill.'+ skill[i],'==',true)
  // console.log('i is',i)
    }
  }
  if(college !== null){
   //for(i in college){
     query  = query.where('college',"==",college)
//  }
}
  if(major !== null){
    query  = query.where('major',"==",major)
  }
//  query = query.orderBy('skill.'+ skill[0])
//  console.log('query is', query);
  query.get().then(snapshot =>{
    if(snapshot.empty){
     console.log('No documents found');
    }
    else{
      data = snapshot.docs.map(documentSnapshot =>{
       return documentSnapshot.data();
      })
      console.log('Doc is', data);
   }
   return res.status(200).json(data);
 })
    .catch(err =>{
     console.log('Oops! Something went wrong.');
      throw new Error(err);
  });
});
