const webpack = require('webpack');
const config = require('./webpack.common.config');

config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'BASE_URI': JSON.stringify('http://rollbox.herokuapp.com/')
    }
}));
module.exports = config;
