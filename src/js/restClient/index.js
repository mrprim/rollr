"use strict";
const get = require('./get');
const getSession = require('./getSession');
const getRolls = require('./getRolls');
const roll = require('./roll');
const updateUser = require('./updateUser');
const validateRoll = require('./validateRoll');

module.exports = {
    get,
    getSession,
    getRolls,
    roll,
    updateUser,
    validateRoll
};
