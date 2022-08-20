const ListDB = require('../DB/ListDB');
const _ = require("lodash")


exports.myList = (req, res) => {
    ListDB.DefaultList.find(function (err, find) {
        if (err) console.log(err);
        else
            res.render("list", { title: "Defult List", newItem: find,placeholder:"Create List"  });
    })
};

exports.search = (req, res) => {
    const search_ = _.capitalize(req.body.inputSeacrh);
    ListDB.List.findOne({ name: search_ }, (err, list) => {
        if (!err) {
            if (list)
                res.render("list", { title: list.name, newItem: list.items ,placeholder:"Create Task"});
            
            else
                res.render("notFound", { item: search_ });
        }
    })
};

exports.show = (req, res) => {
    ListDB.List.find((err, find) => {
        if (!err) {
            res.render("find", { title: find, newItem: find });
        }
    });
};

exports.NoFindinSearch = (req, res) => {
    let path = _.capitalize(req.params.path);
    ListDB.List.findOne({ name: path }, function (err, list) {
        if (!err) {
            if (!list) {
                if (path.substr(0, 5) != "Favic") {
                    const list = new ListDB.List({
                        name: path
                    })

                    const listDF = new ListDB.DefaultList({
                        name: _.lowerFirst(path)
                    });
                    list.save();
                    listDF.save();
                    console.log ('ggg')
                    res.redirect("/" + path);
                }
            }
            else {
                res.render("list", { title: list.name, newItem: list.items,placeholder:"Create Task" });
            }
        }
    })
};


exports.innerItem = (req, res) => {
    let newItem = req.body.userItem
    let addres = req.body.button;
    let resultDL = new ListDB.DefaultList({
        name: newItem
    });
    if (addres === "Defult") {
        ListDB.List.findOne({ name: addres },(err,find) => {
            if(!err && !find){
                let resultIL = new ListDB.List({
                    name: _.capitalize(newItem),
                    items:[]
                });
                resultIL.save();
            }
        });
        
        resultDL.save();
        res.redirect("/myList");
    }
    else {
        ListDB.List.findOne({ name: addres }, (err, list) => {
            list.items.push(resultDL);
            list.save();
            res.redirect("/" + addres);
        });
    }
};



exports.deleteAll = (req, res) => {
    const item = req.body.delete;
    ListDB.List.deleteOne({ name: item }, err => {
        if (err)
            return console.log(err);
    });

    ListDB.DefaultList.deleteOne({ name: _.lowerFirst(item) }, err => {
        if (err)
            return console.log(err);
    });
    res.redirect("/myList");

};


exports.delete = (req, res) => {
    let infoToDeleted = req.body.cb;
    let addres = req.body.hi;
    if (addres === "Defult List") {
        ListDB.DefaultList.findOneAndDelete(infoToDeleted, err => {
            if (!err) {

                ListDB.List.findOneAndDelete(infoToDeleted, err => {
                    if (!err) {
                        console.log("delete successfuly from inner...");
                    } else console.log("can't delete  from inner...");
                });

                console.log("delete successfuly...");
                res.redirect("/myList")
            } else console.log("can't delete ...");
        });

        

        
    }

    else {
        ListDB.List.findOneAndUpdate({ name: addres }, { $pull: { items: { name: infoToDeleted } } }, (err, found) => {
            if (!err)
                res.redirect("/" + addres);
        })
    }
};

