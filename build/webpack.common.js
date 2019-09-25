const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './main.ts'
    },
    output: {
        path: path.join(__dirname, '../dist'),
		filename: '[name].js'
    },
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.html', '.txt']
    },
    module: {
        rules: [
        {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules\/(?!(\@mapp)\/).*/,
            loader: 'ts-loader'
        },
        // {
        //     test: /\.css$/,
        //     use: [
        //         { loader: 'style-loader'}, 
        //         { loader: 'css-loader'}               
        //     ],           
        // },
        {
            test: /\.s[ac]ss$/i,
            use: [
                { loader: 'style-loader'}, 
                { loader: 'css-loader'} , 
                { loader: 'sass-loader'}               
            ],           
        },
        {
            test: /\.(html|txt)$/,
            loader: 'raw-loader'
        },
        {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            }]
        },
        {
            test: /\.(png|jpg|jpeg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/'
                }
            }]
        }]
    },
    devtool: 'source-map',
    node: {
        fs: 'empty'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                luciad_lib: {
                    test: /[\\/]luciad[\\/]/
                    , name: 'luciad-lib'
                    , chunks: 'all'
                },
                vendors: {
                  test: /[\\/]node_modules[\\/]/
                  , name: 'vendors'
                  , chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            hash: true
        })
    ]
}