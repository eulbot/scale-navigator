const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        writeToDisk: true
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     React: 'react',
        //     ReactDOM: 'react-dom'
        // }),
        // new webpack.DefinePlugin({
        //     DEBUG_MODE: JSON.stringify(true)
        // })
    ]
});