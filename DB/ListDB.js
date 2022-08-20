const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ToDoListDB").then(()=>{
    console.log('connect database...');
});

/* Information Of Data Base */
const DefultSchema = new mongoose.Schema({
    name: String
})
const DefaultList = mongoose.model("DefaultList", DefultSchema);


const ListShema = new mongoose.Schema({
    name: String,
    items: [DefultSchema]
})
const List = mongoose.model("List", ListShema);


const listDB = {
    DefaultList,
    List
}
module.exports = listDB;