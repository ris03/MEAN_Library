var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var bookSchema = new mongoose.Schema({
    name:String,
    genre:String,
    units: Number,
    issuedunits:Number,
    availableunits:Number
});


module.exports = mongoose.model("Book", bookSchema);