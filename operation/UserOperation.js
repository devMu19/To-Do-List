const userDB = require('../DB/UserDB');
const bcrypt = require("bcrypt")
const saltNumber = 10;

exports.login  =  (req, res) => {
    res.render('login');
};

exports.signin= (req, res) => {
    res.render('signin');
};


exports.postLogin= (req, res) => {  
    const email = req.body.email;
    const password = req.body.password;
    userDB.findOne({ email: email }, (err, find) => {
        if (!err)
            if (find) {
                bcrypt.compare(password, find.password, (err, result) => {
                    if (result) res.redirect("/myList")
                    else res.render("error", { obError: "error in password" });
                });
            }
            else {
                res.render("error", { obError: "You are not logged in from this account previously, you can create a new account or log in with a previously registered account" })
            }
        else res.send(err)
    });
};


exports.postSignin = (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    userDB.findOne({ email: email }, (err, find) => {
        if (!err)
            if (find) {
                res.render("error", { obError: "This account has already been logged in... You can login directly." })

            }
            else {
                bcrypt.hash(password, saltNumber, (err, hash) => {
                    const newUser = new userDB({
                        fname: fname,
                        lname: lname,
                        email: email,
                        password: hash,
                    });
                    newUser.save((err) => {
                        if (!err) {
                            console.log("Successfuly Save New User");
                            res.redirect("/myList")
                        }
                        else console.log("Cant Save" + err);
                    });
                })
            }
        else res.send(err)
    });
};


exports.postError = (req, res) => {
    if (req.body.errorh1 === "You")
        res.redirect("/signin")
    else
        res.redirect("/login")

};
