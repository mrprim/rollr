"use strict";
const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');
const router = express.Router();
const app = express();
const db = require('./db');
const listenPort = process.env.PORT || 3000;

routes();
connectToDb()
    .then(listen)
    .catch(logDbConnectionError);

function routes() {
    const api = require('./api/index');

    app.use(express.static('static'));
    app.use(expressSession({
        secret: 'my secret key',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/api/', api.auth.google);
    app.use('/api/', api.session);
    app.use(basicErrorHandling);
}

function basicErrorHandling(err, req, res, next) {
    if (err.stack) {
        console.error(err.stack);
        res.status(500).send('Unfortunately an error has occurred.');
    } else {
        res.status(400).json({
            error: err
        });
    }
}

function connectToDb() {
    return db.connect();
}

function listen() {
    app.listen(listenPort);
    console.log('Listening on port ' + listenPort);
}


function logDbConnectionError(error) {
    console.log('Database Connection Error:', error);
}
