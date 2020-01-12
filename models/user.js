const fb = require("./fb.js");
const crypto = require("crypto-js");

const database = fb.database;

var connectedRef = fb.database.ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    console.log("Firebase Connected");
  } else {
    console.log("Firebase Not Connected");
  }
});

function Create(user, callback) {
    let id = database.ref('users/').push().key;
    let hash = crypto.AES.encrypt(user.password, user.username).toString();
    console.log("Regular Password: " + user.password + "|Encrypted Password: " + hash);
    database.ref('users/' + user.username).set({
        "password": hash,
        "admin": user.admin,
    }, (err) => {
        callback(err);
    });
}

function RetrieveOne(username, callback) {
    database.ref('users/' + username).once('value').then(function(snapshot) {
        let user = snapshot.val();
        console.log(user);
        if (user) {
            user.username = username;
            user.password = crypto.AES.decrypt(user.password, username).toString(crypto.enc.Utf8);
            callback(user)
        } else {
            callback(null)
        }
    })
}

function RetrieveAll(callback) {
    database.ref('users').once('value').then(function(snapshot) {
        callback(snapshot.val());
    })
}

function Update(username, newData, callback) {
    var updates = {};
    let hash = crypto.AES.encrypt(newData.password, username).toString();
    newData.password = hash;
    //console.log(newData.toString());
    updates = newData;
    database.ref('/users/' + username).update(updates, (err) => {
        callback(err);
    })
}

function Delete(username, callback) {
    database.ref('users/' + username).remove((err) => {
        callback(err);
    })
}

module.exports = {
    Create,
    RetrieveOne,
    RetrieveAll,
    Update,
    Delete
}