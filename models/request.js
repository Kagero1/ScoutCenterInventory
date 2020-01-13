const fb = require("./fb.js");

const database = fb.database;

function CreateRequesting(request, callback) {
    let id = database.ref('requests/').push().key;
    var troopNumber = request.troopNumber;
    console.log(troopNumber);
    database.ref('requests/' + id).set({
        "troop" : troopNumber,
        "itemName" : request.itemName,
        "quantity" : request.quantity,
        "reason" : request.reason,
        "dateBorrow" : request.dateBorrow,
        "dateReturn" : request.dateReturn,
        "status" : request.status
    }, (err) => {
        callback(err);
    });
}

function RetrieveOne(request, callback){
    var requests;
    database.ref("requests/").once('value').then(function(snapshot){
        snapshot.forEach((child) =>{
            if(child.val().troop == request){
                requests = child.val();
                callback(requests);
            }
        })
        callback(null);
    });
}

function RetrieveAll(callback){
    database.ref("requests/").once('value').then(function(snapshot){
        callback(snapshot.val());
    });
}

function Update(requestId, newData, callback){
    var updates={};
    updates = newData;
    database.ref("/requests/" + requestId).update(updates, (err) =>{
        callback(err);
    })
}

module.exports = {
    CreateRequesting,
    Update,
    RetrieveOne
}