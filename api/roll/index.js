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
    if (roll.validate(diceString)) {
        let result = roll.roll(diceString);
        let newRoll = {
            userId: req.user && req.user._id,
            diceString: diceString,
            result: JSON.stringify(result),
            date: Date.now()
        }
        let db = new DbRoll(newRoll);
        db.save();

        res.json(newRoll);
    } else {
        res.json({
            error: 'error'
        });
    }
    //    req.user._id
});

router.post('/roll/', function(req, res) {
    const roll = new Roll();

    let diceString = req.body.diceString;
    if (roll.validate(diceString)) {
        let result = roll.roll(diceString);
        let newRoll = {
            userId: req.user && req.user._id,
            diceString: diceString,
            tags: req.body.tags,
            result: JSON.stringify(result),
            date: Date.now()
        }
        let db = new DbRoll(newRoll);
        db.save();

        res.json(newRoll);
    } else {
        res.json({
            error: 'error'
        });
    }
});

router.get('/roll', function(req, res) {
    DbRoll.find({}, (err, rolls) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rolls);
        }
    });
});

module.exports = router;
