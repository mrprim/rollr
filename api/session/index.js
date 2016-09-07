"use strict";
const express = require('express');
const router = express.Router({
    mergeParams: true
});

router.get('/', function(req, res) {
    if (!req.user) {
        res.json({});
    } else {
        res.json({
            user: req.user
        });
    }
});

module.exports = router;
