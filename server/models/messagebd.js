var mongoose = require('mongoose');

var MessagebdSchema = new mongoose.Schema({
    //key : data type
    name : String,
    message : String
});

module.exports = mongoose.model("messages", MessagebdSchema);
