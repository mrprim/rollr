"use strict";
const request = require('request');
const url = require('url');
const baseUrl = process.env.BASE_URI;

module.exports = function(urlString, req) {
    if (urlString && urlString.length < 4 || (urlString.length >= 4 && urlString.substring(0, 3).toLowerCase() !== 'http')) {
        urlString = url.resolve(baseUrl, urlString);
    }
    console.log(baseUrl, urlString);
    return new Promise((resolve, reject) => {

        request({
            uri: urlString,
            method: 'POST',
            json: true,
            body: req
        }, (error, response, body) => {
            if (error || response.statusCode != 200) {
                console.log('err', error);
                reject(error);
            }

            let json = body;
            resolve(json);
        });
    });
};
