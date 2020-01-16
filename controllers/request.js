const requestDB = require("../models/request.js");
const itemDB = require("../models/inventory.js");

function RetrieveAllTroop(req, res){
    var troopNo = req.session.username;

    requestDB.RetrieveTroop(troopNo, (requests)=>{
        res.render("request-status.hbs", {
            requests: requests,
            troopNo : troopNo,
            type : req.session.admin
        })
    })
}

function UpdateReturn(req, res){
    var flag;

    var date = req.body.dateReturn;
    var id = req.body.id;

    var request = {}
    request.dateReturn = date;
    request.status = req.body.status;

    requestDB.Update(id, request, (err)=>{
        if(err)
            flag = err;
    });

    var item = {};
    var uname = req.body.name;
    item.currentQty = req.body.currentQty;

    itemDB.Update(uname, item, (err)=>{
        if(err)
            flag = err;
    });

    if(flag){
        console.log(err);
        res.send("FAIL");
    }else{
        res.send("OK");
    }
}

module.exports={
    RetrieveAllTroop,
    UpdateReturn
}