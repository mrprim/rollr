"use strict";
const express = require('express');
const Roll = require('roll');
const DbRoll = require('../../db/Roll');
const router = express.Router({
    mergeParams: true
});
let io;


router.get('/roll/:diceString', function(req, res) {
    const roll = new Roll();
    let diceString = req.params.diceString;
    if (roll.validate(diceString)) {
        let result = roll.roll(diceString);
        let newRoll = {
            _user: req.user && req.user._id,
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
});

router.get('/roll/validate/:diceString', function(req, res) {
    const roll = new Roll();
    let diceString = req.params.diceString
    res.json({
        valid: roll.validate(diceString)
    });
});

router.post('/roll/', function(req, res) {
    const roll = new Roll();

    let diceString = req.body.diceString;
    if (roll.validate(diceString)) {
        let result = roll.roll(diceString);
        let newRoll = {
            _user: req.user && req.user._id,
            diceString: diceString,
            tags: req.body.tags,
            result: JSON.stringify(result),
            date: Date.now()
        }
        let db = new DbRoll(newRoll);

        db.save((err, roll) => {
            if (err) {
                res.json({
                    error: err
                });
            } else {
                roll._user = req.user;

                req.app.io.emit('roll', roll);
                res.json(roll);
            }
        });

    } else {
        res.json({
            error: 'error'
        });
    }
});

router.get('/roll', function(req, res) {
    let sort = (req && req.sort && req.sort.field) || 'date';
    let sortDirection = (req && req.sort && req.sort.direction) || '-';
    let limit = (req && req.limit) || 30;

    DbRoll.find({})
        .populate('_user', 'email username')
        .sort(sortDirection + sort)
        .limit(limit)
        .exec((err, rolls) => {
            if (err) {
                res.json(err);
            } else {
                res.json(rolls);
            }
        });
});

module.exports = router;
