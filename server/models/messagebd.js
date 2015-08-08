var mongoose = require('mongoose');
var moment = require('moment');

var MessagebdSchema = new mongoose.Schema({
    //key : data type
    name : String,
    message : String,
    timestamp : {type: Date, default: moment().format()}
});

module.exports = mongoose.model("messages", MessagebdSchema);
