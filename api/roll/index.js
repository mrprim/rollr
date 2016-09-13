"use strict";
const express = require('express');
const Roll = require('roll');
const DbRoll = require('../../db/Roll');
const router = express.Router({
    mergeParams: true
});



router.get('/roll/:diceString', function(req, res) {
    const roll = new Roll();
    let diceString = req.params.diceString;
    if(roll.validate(diceString)) {
        let result = roll.roll(diceString);
        let db = new DbRoll({
            userId: req.user && req.user._id,
            diceString: diceString,
            result: JSON.stringify(result),
            date: Date.now()
        });
        db.save();

        res.json(result);
    } else {
        res.json({error:'error'});
    }
//    req.user._id
});

router.get('/roll', function(req, res) {
    DbRoll.find({}, (err, rolls) => {
        if(err) {
            res.json(err);
        } else {
            res.json(rolls);
        }
    });
});

module.exports = router;
