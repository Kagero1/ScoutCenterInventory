const itemDB = require("../models/inventory.js");

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
    
}

module.exports = {
    UploadItems,
    RetrieveAll
}