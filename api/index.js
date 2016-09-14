"use strict";
const auth = require('./auth/');
const session = require('./session/');
const roll = require('./roll/');
const user = require('./user/');

module.exports = {
    auth,
    session,
    roll,
    user
};
