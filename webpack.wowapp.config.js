const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');

module.exports = {
    entry: {
        wowapp: "./src/index.tsx"
    },
    output: {
        filename: "[name].js",             
        path: path.resolve(__dirname, "client"),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".scss", ".css"],
        modules: [
            'node_modules',
            path.resolve(__dirname, './node_modules')
        ]
    },
    devtool: "eval",       
    module: {
        rules: [{
            test: /\.ts(x)?$/,
            use: [
                {
                    loader: 'babel-loader',
                },
                {
                    loader: 'ts-loader'
                }
            ]
        },
        {
            test: /\.css$/,
            use: 'css-loader'
        },
        {
            test: /\.js$/,
            use: "source-map-loader",
            enforce: 'pre',
        },
        {
            test: /\.js$/,
            loader: 'babel-loader'
        }
        ],
    },
    plugins: [        
        new UglifyJSPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),       
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
          }), 
    ]
}
