const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg');


function getPlugins(_isProd) {
    var plugins = [];

    plugins.push(

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
                './css/*.css',
                './src/*.js',
                './img/*.*',
                './*.html'
            ]
        }),

        new CopyWebpackPlugin([{
            from: 'img/',
            to: 'img'
        }]),

    );

    if (_isProd) {
        plugins.push(

            new UglifyJSPlugin({
                sourceMap: true
            }),

            new ImageminPlugin({
                test: /\.(jpe?g|png|gif|svg)$/i,

                optipng: {
                    optimizationLevel: 3
                },

                pngquant: {
                    quality: '60-75'
                },

                jpegtran: null,

                plugins: [
                    imageminMozjpeg({
                        quality: 60,
                        progressive: true
                    })
                ],
            })
        );
    }

    return plugins;
}


module.exports = function (env) {

    const isProd = env.production === true;

    return {

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
                                url: false,
                                minimize: isProd,
                                sourceMap: true
                            }
                        }, {
                            loader: "sass-loader"
                        }]
                    })
                }
            ],

        },

        plugins: getPlugins(isProd)

    }
};
