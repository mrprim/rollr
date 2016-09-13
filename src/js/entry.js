//require('expose?$!jquery');
//require('expose?jQuery!jquery');
require('expose?io!socket.io-client');

const React = require('react');
const ReactDOM = require('react-dom');
const Rollr = require('./components/Rollr/Rollr');

ReactDOM.render( < Rollr / > , document.getElementById('Rollr'));
