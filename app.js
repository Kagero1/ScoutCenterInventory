const express = require("express");
const bparser = require("body-parser");
const hbs = require("hbs");
const session = require("express-session");
const cparser = require("cookie-parser");
const app = express();

hbs.registerPartials(__dirname + "/views/partials", ()=>{
    console.log("Partials are loaded successfully");
});

app.set('view engine', 'hbs');

app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: "cksScoutCenter",
    name: "acctCookie",
    resave: true,
    saveUninitialized: true,
    cookie:{

    }
}));

app.use(cparser());

app.use(bparser.json({limit: "50mb"}));
app.use(bparser.urlencoded({limit: "50mb", extended: true}));

//Models

//Controllers
const userController = require(__dirname + "/controllers/user.js");
const inventoryController = require(__dirname + "/controllers/inventory.js");
const requestController = require (__dirname + "/controllers/request.js");

//Routes
//Post
app.post("/login", userController.authenticate);
app.post("/upload", inventoryController.UploadItems);
app.post("/borrow", inventoryController.UpdateData);

//Get
app.get("/", (req, res)=>{
    res.render("login.hbs") ;
});
app.get("/home", (req, res)=>{
    res.render("home.hbs", {
        troopNo : req.session.username,
        type : req.session.admin
    })
});
app.get("/signup", userController.Create);
app.get("/inventory", inventoryController.RetrieveAll);
app.get("/logout", (req, res)=>{
    req.session.destroy();
    res.redirect("/");
});
app.get("/requestStatus", requestController.RetrieveAllTroop);
// app.get("/requestItems", function(req, res){
//     res.render("request.hbs", {
//         troopNo : req.session.username,
//         type : req.session.admin
//     })
// })
app.get('*', function(req, res){
    res.render("404.hbs");
});
  

//Listen
app.listen(process.env.PORT || 3000, function(){
    console.log("Server Live at Port 3000");
});