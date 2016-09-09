const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rollSchema = new Schema({
    userId: Objectid,
    diceString: String,
    result: String,
    tags: Array,
    date: Date
});

const Roll = mongoose.model('Roll', rollSchema);

module.exports = Roll;
