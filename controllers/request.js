const requestDB = require("../models/request.js");

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
    var date = req.body.dateReturn;
    var id = req.body.id;

    var request = {}
    request.dateReturn = date;
    request.status = req.body.status;

    requestDB.Update(id, request, (err)=>{
        if(err){
            console.log(err);
            res.send("FAIL");
        }else{
            res.send("OK");
        }
    })
}

module.exports={
    RetrieveAllTroop,
    UpdateReturn
}