const fb = require("./fb.js");

const database = fb.database;

function Create(request, callback) {
    let id = database.ref('requests/').push().key;
    database.ref('requests /' + item.name).set({
        "category": item.category,
        "currentQty": item.currQty,
        "totQty": item.totQty
    }, (err) => {
        callback(err);
    });
}

function Update(requestId, newData, callback){
    var updates={};
    updates = newData;
    database.ref("/requests/" + requestId).update(updates, (err) =>{
        callback(err);
    })
}