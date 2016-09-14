"use strict";
const express = require('express');
const User = require('../../db/User');
const router = express.Router({
    mergeParams: true
});


router.post('/user/', function(req, res) {
    let id = req.body.id;
    let user = req.body;
    let db = new User(user);
    db.findOneAndUpdate({_id: id}, user, ()=> {
        res.json(user);
    });
});

module.exports = router;
