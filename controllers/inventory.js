const itemDB = require("../models/inventory.js");
const requestDB = require("../models/request.js");

function UploadItems(req, res) {
    let inventory = req.body.items;
    let error;
    for(i = 0; i < inventory.length; i++){
        if(inventory[i]["Item Name"].replace(/\s/g,"") != ""){
            item = {};
            item.name = inventory[i]["Item Name"];
            item.uname = inventory[i]["Item Name"].replace(/\s/g,"");
            item.category = inventory[i]["Category"];
            item.currQty = inventory[i]["Total Quantity"];
            item.totQty = inventory[i]["Total Quantity"];
        }
        itemDB.Create(item, (err)=>{
            if(err){
                err = error;
            }
        });
    }
    if(error){
        console.log(error);
        res.send("FAIL");
    }else
        res.send("OK");
}

function RetrieveAll(req, res){
    itemDB.RetrieveAll((items)=>{
        console.log(items);
        res.render("inventory.hbs", {
            troopNo:req.session.username,
            type:req.session.admin,
            item:items
        })
    })
}

function UpdateData(req, res){
    var troopNumber = req.session.username;
    let error;
    var item = req.body.item;
    var items = {};
    items.currentQty = item.currentQty;
    var key = req.body.name;

    itemDB.Update(key, items, (err)=>{
        if(err){
            error = err
        }
    });

    var request = {};
    request.troopNumber = troopNumber;
    request.itemName = key;
    request.category = item.category;
    request.quantity = item.borrowQty;
    request.reason = item.reason;
    request.dateBorrow = item.dateBorrow;
    request.dateReturn = "";
    request.status = "Pending";

    requestDB.CreateRequesting(request, (err)=>{
        if(err){
            error = err
        }
    });

    if(error){
        res.send("FAIL");
        console.log(error);
    }else{
        res.send("OK");
    }
}

module.exports = {
    UploadItems,
    RetrieveAll,
    UpdateData
}