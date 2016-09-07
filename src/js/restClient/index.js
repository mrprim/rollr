"use strict";
const request = require('request');
const url = require('url');
const baseUrl = 'http://localhost:3000/';

const get = require('./get');
const getSession = require('./getSession');

module.exports = {
    get,
    getSession
};
