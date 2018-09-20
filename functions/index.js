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
  var person = req.body;
  var data;
  var query = peopleRef;
  //console.log('req',req.body);



  //console.log('skill',skill);
  if(person.hasOwnProperty('skills')){
    if(person.skills !== undefined || person.skills.length !== 0){
  for(i in person.skills){
   query  = query.where('skills.'+ person.skills[i],'==',true)
  // console.log('i is',i)
    }
  }
}
if(person.hasOwnProperty('currentProject')){
  if(person.currentProject !== "" ){
  query  = query.where('currentProject','==',person.currentProject)
}
}

if(person.hasOwnProperty('status')){
 if(person.status !== ""){
  query  = query.where('status','==',person.status)
}
}

if(person.hasOwnProperty('experienceLevel')){
  if(person.experienceLevel !== ""){
  query  = query.where('experienceLevel','==',person.experienceLevel)
}
}
if(person.hasOwnProperty('role')){
  if(person.role !== ""){
  query  = query.where('role','==',person.role)
}
}

if(person.hasOwnProperty('referralSource')){
  if(person.referralSource !== ""){
  query  = query.where('refferedBy','==',person.referralSource)
}
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

exports.getListOfCategory = functions.https.onRequest((req,res) =>{
  let categories = []
  let allCategories = [];
  var listRef = db.collection('lists')

  listRef.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const data = doc.data();
        if(data.listName !== undefined) {
            const categoryName = data.listName.toLowerCase()
            if(!categories.includes(categoryName)){
                categories.push(categoryName)
                const cat = {
                    listName: categoryName,
                    listItem: []
                };
                allCategories.push(cat)
            }
        }
    });

    querySnapshot.forEach(doc => {
        const data = doc.data();
        if(data.listName !== undefined) {
            const categoryName = data.listName.toLowerCase()
            for(var i=0;i<allCategories.length;i++){
                if(allCategories[i].listName===categoryName){
                    allCategories[i].listItem.push(data.name)
                }
            }
        }
    });

    return res.status(200).json(allCategories);
})

  .catch(err =>{
  console.log('Oops! Something went wrong.');
   throw new Error(err);
  });
});




exports.addToData = functions.https.onRequest((req,res) =>{
  if(req.body.hasOwnProperty('person')){
    var data = req.body.person;
    db.collection('people').add(data);
  }
  else{
    var newList = req.body;
    db.collection('lists').add(newList);
  }
});
