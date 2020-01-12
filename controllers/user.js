const userDB = require("../models/user.js");
// const requestDB = require("../models/request.js");
// const catDB = require("../models/cat.js")

function authenticate(req, res) {
    let un = req.body.un;
    let pw = req.body.pw;
    userDB.RetrieveOne(un, (user) => {
        if (user && user.password === pw) {
            req.session.username = un;
            req.session.admin = user.admin;
            res.send("OK")
        } else {
            res.send("FAIL")
        }
    })
}

function logout(req, res) {
    req.session.username = null;
    req.session.admin = null;
    req.session.cookie.expires = false;
    res.send("OK")
}

function RetrieveAll(req, res) {
    let user = null
    if (req.session.username) {
        user = {};
        user.username = req.session.username;
        user.admin = req.session.admin;
        if (user.admin) {
            userDB.RetrieveAll((users) => {
            res.render("users.hbs", {
                    users: users,
                    user: user
                })
            })
        }
    } else {
        res.render("404.hbs");
    }
    
}

// function RetrieveOne(req, res) {
//     if (!req.session.username) res.render("404.hbs");
//     userDB.RetrieveOne(req.session.username, (user) => {
//         requestDB.RetrieveAll((requests) => {
//             for (let request in requests) {
//                 console.log(requests[request].user)
//                 console.log(user.username)
//                 if (requests[request].user != user.username) delete requests[request];
//             }
//             if (Object.keys(requests).length == 0) requests = null;
//             if (requests) {
//                 console.log(requests)
//                 var total = Object.keys(requests).length;
//                 var count = 0;
//                 let pending = {};
//                 let completed = {};
//                 for (let request in requests) {
//                     catDB.RetrieveOne(requests[request].cat, (cat) => {
//                         requests[request].cat = cat;
//                         count++;
//                         if (count > total - 1) {
//                             for (let r in requests) {
//                                 if (requests[r].completed) completed[r] = requests[r];
//                                 else pending[r] = requests[r];
//                             }
//                             res.render("profile.hbs", {
//                                 requests: {
//                                     pending: Object.keys(pending).length > 0 ? pending : null,
//                                     completed: Object.keys(completed).length > 0 ? completed : null
//                                 },
//                                 user: user
//                             })
//                         }
//                     });
//                 }
//             } else {
//                 res.render("profile.hbs", {
//                     requests: {
//                         pending: null,
//                         completed: null
//                     },
//                     user: user
//                 })
//             }
//         })
//     })
// }

function RetrieveOne(req, res) {

}

function Create(req, res) {
    let un = req.body.un;
    let pw = req.body.pw;
    userDB.RetrieveOne(un, (user) => {
        console.log(user)
        if (user) {
            res.send("FAIL")            
        } else {
            user = {};
            user.username = un;
            user.password = pw;
            user.admin = false;
            // console.log("Hi I am here" + user.username + user.password);
            userDB.Create(user, (err) => {
                if (err) {
                    console.log(err);
                    res.send("FAIL")
                } else {
                    req.session.username = un;
                    req.session.admin = user.admin;
                    res.send("OK")
                }
            })
    
        }
    })  
}

function Update(req, res) {
    let un = req.body.un;
    let pw = req.body.pw;

    userDB.RetrieveOne(un, (user)=>{
        if(user){
            user.password = pw;
            let key = "username";
            delete user[key]; 
            console.log(JSON.stringify(user));
            userDB.Update(un, user, (err)=>{
                if(err){
                    console.log(err);
                    res.send("FAIL Update");
                }else{
                    req.session.username = un;
                    req.session.admin = user.admin;
                    res.send("Update SUCCESS");
                }
            })
        }
    })
}

function Delete(req, res) {
    
}

module.exports = {
    authenticate,
    logout,
    Create,
    RetrieveAll,
    RetrieveOne,
    Update,
    Delete
}