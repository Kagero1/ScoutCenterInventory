const fb = require("./fb.js");

const database = fb.database;

function Create(item, callback) {
    let id = database.ref('items/').push().key;
    // item.name = item.name.replace(/\s/g, '');
    database.ref('items/' + item.name).set({
        "uname": item.uname,
        "category": item.category,
        "currentQty": item.currQty,
        "totQty": item.totQty
    }, (err) => {
        callback(err);
    });
}

function Update(item, newData, callback){
    var updates={};
    updates = newData;
    database.ref("/items/" + item).update(updates, (err) =>{
        callback(err);
    })
}

function RetrieveOne(item, callback){
    database.ref("items/" + item).once('value').then(function(snapshot){
        let items = snapshot.val();
        console.log(items);
        if(items){
            items.name = item;
            callback(items);
        }else{
            callback(null);
        }
    })
}

function RetrieveAll(callback){
    database.ref("items/").once("value").then(function(snapshot){
        console.log(snapshot.val());
        callback(snapshot.val());
    });
}

module.exports = {
    Create,
    RetrieveAll,
    Update,
    RetrieveOne
}