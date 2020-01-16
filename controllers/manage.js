const requestDB = require("../models/request.js");
const itemDB = require("../models/inventory.js");

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
    var flag;

    var status = req.body.status;
    var id = req.body.id;

    var request={};
    request.status = status;

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

module.exports = {
    RetrieveAll,
    UpdateStatus
}