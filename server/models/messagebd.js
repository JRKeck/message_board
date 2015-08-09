var mongoose = require('mongoose');
var moment = require('moment');

var MessagebdSchema = new mongoose.Schema({
    //key : data type
    name : String,
    message : String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("messages", MessagebdSchema);
