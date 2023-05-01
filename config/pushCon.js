const adminAndroid = require('firebase-admin');

let androidServiceAccount = require('./nodeproject-3c85b-firebase-adminsdk-pt30n-f24892c4e6.json')

const admin = adminAndroid.initializeApp({
	credential : adminAndroid.credential.cert(androidServiceAccount)
    });
    
module.exports = admin;