var express = require('express');
var router = express.Router();
var path = require('path');
var Messages = require('../models/messagebd');

router.post("/", function(req, res, next){
    console.log("Post Hit: ", req.body);
    Messages.create(req.body, function(err, post){ //create is mongoose function
        res.send("Yes");
    });
});

router.delete("/:id", function(req, res, next){
    Messages.findByIdAndRemove(req.params.id, req.body, function(err, post){
        if(err){
            console.log("Error: ", err);
        }
        res.json(post);
    });
});

router.get("/", function(req, res, next){
    Messages.find(function(err, messages){
        res.json(messages);
    })

});

module.exports = router;