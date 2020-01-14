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

module.exports={
    RetrieveAllTroop
}