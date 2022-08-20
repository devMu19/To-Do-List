const express = require("express");
const bodyParser = require("body-parser");
const UserRoute = require("./Router/UserRoute")
const ListRoute = require("./Router/ListRoute")
const ListDB = require('./DB/ListDB');

const app = express();
app.use(express.static("public"))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


/* Start Request*/ 

app.use('/',UserRoute);
app.use('/',ListRoute);

app.get('/', (req, res) => {
    res.render('home');
});

app.get("/myList", (req, res) => {
    ListDB.find(function (err, find) {
        if (err) console.log(err);
        else
            res.render("list", { title: "Defult List", newItem: find });
    })
});





app.listen("3000", () => {
    console.log("started...")
})