const requestDB = require("../models/request.js");

function RetrieveAll(req, res){
    requestDB.RetrieveAll((requests) =>{
        res.render("manage-request.hbs", {
            requests:requests,
            troopNo:req.session.username,
            type:req.session.admin
        })
    })
}

function UpdateStatus(req, res){
    var status = req.body.status;
    var id = req.body.id;

    var request={};
    request.status = status;

    requestDB.Update(id, request, (err)=>{
        if(err){
            console.log(err);
            res.send("FAIL");
        }else{
            res.send("OK");
        }
    })
}

module.exports = {
    RetrieveAll,
    UpdateStatus
}