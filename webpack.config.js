const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin')



module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + "/dist",
        filename: 'bundle.js'
    },

    watch: true,

    devtool: "source-map",


    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true,
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader"
                    }]
                })
            }
        ],

    },


    plugins: [
        // new UglifyJSPlugin({
        //     sourceMap: true
        // }),

        new ExtractTextPlugin({
            filename: 'bundle.css'
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),

        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: {
                baseDir: "./"
            },
            files: [
                'css/*.css',
                'src/*.js',
                './*.html'
            ]
        }),

        new CopyWebpackPlugin([{
            from: 'images/'
        }]),
    ]

};




