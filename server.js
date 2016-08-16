"use strict";
const express = require('express');
const router = express.Router();
const app = express();
const listenPort = process.env.PORT || 3000;

routes();
listen();

function routes() {
	const api = require('./api/index');

	app.use(express.static('static'));
	app.use('/api/', api);
}

function listen() {
	app.listen(listenPort);
	console.log('Listening on port ' + listenPort);
}
