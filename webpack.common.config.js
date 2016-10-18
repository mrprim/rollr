const webpack = require('webpack');
const vars = require('./variables.config')

module.exports = {
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    entry: vars.APP_DIR + "/js/entry.js",
    output: {
        path: vars.BUILD_DIR,
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.less$/,
            loaders: ["style", "css", "less"]
        }, {
            test: /\.json?/,
            loader: 'json'
        }, {
            test: /\.(jpg|png)$/,
            loader: 'url-loader?limit=100000'
        }, {
            test: /\.jsx?$/,
            loaders: ['babel?cacheDirectory'],
            include: vars.APP_DIR
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    externals: [{
        "window": "window"
    }],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
