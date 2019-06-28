const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [new CleanWebpackPlugin()],
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};