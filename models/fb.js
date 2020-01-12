var firebase = require("firebase/app")

require("firebase/database")

var firebaseConfig = {
  apiKey: "AIzaSyCtNiBDnffKTZvK4PgLfcc7pboYLvIywYY",
  authDomain: "scout-center-inventory.firebaseapp.com",
  databaseURL: "https://scout-center-inventory.firebaseio.com",
  projectId: "scout-center-inventory",
  storageBucket: "scout-center-inventory.appspot.com",
  messagingSenderId: "199437167961",
  appId: "1:199437167961:web:f1b8aa55bf269b6101b048",
  measurementId: "G-9ML3SXMF8F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

module.exports = {
    database
}