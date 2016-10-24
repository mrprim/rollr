"use strict";
const express = require('express');
const Roll = require('roll');
const DbRoll = require('../../db/Roll');
const DbUser = require('../../db/User');
const router = express.Router({
    mergeParams: true
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

router.get('/roll/:id', function(req, res) {
    const roll = new Roll();
    let id = req.params.id;

    DbRoll.findOne({_id: id})
        .populate('_user', 'email username')
        .exec((err, roll) => {
            if (err) {
                res.json(err);
            } else {
                res.json(roll);
            }
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
                DbUser.find({
                    _id: roll._user
                }).exec((err, usr) => {
                    roll._user = usr;
                    req.app.io.emit('roll', roll);
                    res.json(roll);

                });

            }
        });

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

module.exports = router;
