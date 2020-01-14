const fb = require("./fb.js");

const database = fb.database;

function CreateRequesting(request, callback) {
    let id = database.ref('requests/').push().key;
    var troopNumber = request.troopNumber;
    console.log(troopNumber);
    database.ref('requests/' + id).set({
        "troop" : troopNumber,
        "itemName" : request.itemName,
        "category" : request.category,
        "quantity" : request.quantity,
        "reason" : request.reason,
        "dateBorrow" : request.dateBorrow,
        "dateReturn" : request.dateReturn,
        "status" : request.status
    }, (err) => {
        callback(err);
    });
}

function RetrieveTroop(request, callback){
    database.ref("requests/").once('value').then(function(snapshot){
        var requests = snapshot.val();
        var results = {};

        if(request){
            console.log(request);
            for(let re in requests){
                console.log("Request: " + re);
                console.log("Troop Request" + requests[re].troop)
                if(requests[re].troop == request){
                    results[re] = requests[re];
                }
            }
            callback(results);
        }else{
            callback(null);
        }
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
    RetrieveTroop,
    RetrieveAll
}