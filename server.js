"use strict";
const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');
const router = express.Router();
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const db = require('./db');
const listenPort = process.env.PORT || 3000;
const bodyParser = require('body-parser');

setupIo();
setupRoutes();
connectToDb()
    .then(listen)
    .catch(logDbConnectionError);


function setupIo() {
    app.io = io;
}

function setupRoutes() {
    const api = require('./api/index');
    app.use(bodyParser.json());
    app.use(express.static('./static'));
    app.use(expressSession({
        secret: '12185615-c02f-4513-993f-0e26681fdb93',
        saveUninitialized: true
    }));
    resave: true,
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/api/', api.auth.google);
    app.use('/api/', api.session);
    app.use('/api/', api.roll);
    app.use('/api/', api.user);
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
    server.listen(listenPort);
    console.log('Listening on port ' + listenPort);
}


function logDbConnectionError(error) {
    console.log('Database Connection Error:', error);
}
