var path = require('path');
var webpack = require('webpack');

let isMini = process.env.npm_lifecycle_event === 'mini' ? true : false;
let name = isMini ? 'router.min' : 'router';

module.exports = {
    entry: {
        [name]: './src/router.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'JQSPA',
        libraryTarget: 'umd'
    },

    devServer: {
        historyApiFallback: true,
        inline: true
    },

    externals: {
        jquery: {
           commonjs: 'jquery',
           commonjs2: 'jquery',
           amd: 'jquery',
           root: 'jQuery'
        }
    },

    module: {
        rules: [{ // es6
            test: /\.js$/,
            include: path.resolve(__dirname, './src/'),
            use: { loader: 'babel-loader', options: { presets: ['es2015-loose', 'stage-0'] } }

        }, { // IE兼容
            test: /\.js$/,
            // include: config.srcPath,
            enforce: 'post',
            loader: 'es3ify-loader'
        }]
    },

    plugins: isMini ? [new webpack.optimize.UglifyJsPlugin()] : []
}

