"use strict";
const express = require('express');
const Roll = require('roll');
const router = express.Router({
    mergeParams: true
});

router.get('/roll/:diceString', function(req, res) {
    const roll = new Roll();
    let diceString = req.params.diceString;
    if(roll.validate(diceString)) {
        let result = roll.roll(diceString);
        console.log(result);
        res.json(result);
    } else {
        res.json({error:'error'});
    }
//    req.user._id
});

module.exports = router;
