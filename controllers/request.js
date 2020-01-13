const requestDB = require("../models/request.js");

function RetrieveAllTroop(req, res){
    var troopNo = req.session.username;

    requestDB.
}