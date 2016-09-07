"use strict";
const express = require('express');
const User = require('../../db/User');
const router = express.Router({
    mergeParams: true
});

router.get('/', function(req, res) {
    if (!req.user) {
        res.json({});
    } else {
        console.log(req.user);
        User.findById(req.user._id)
            .exec((err, user) => {
                console.log(user);
                if (user) {
                    res.json({
                        user
                    });
                } else {
                    res.json({});
                }
            })
    }
});

module.exports = router;
