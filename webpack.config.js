const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";
const path = require('path');


module.exports = {
    mode: process.env.NODE_ENV,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js"
    },
    module: {
        rules: [
          {
            test: /\.jsx?/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.(sa|sc|c)ss$/i,
            exclude: /node_modules/,
            use: [
              devMode ? "style-loader" : MiniCssExtractPlugin.loader,
              // Translates CSS into CommonJS
              "css-loader",
              // // Compiles Sass to CSS
              // "sass-loader",
            ],
          }
        ]
      },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Development",
        template: "./src/index.html",
      })
    ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'build'),
        publicPath: '/build',
      },
    //   proxy: {
    //     '/api' : 'http://localhost:3000'
    //   },
      hot: true,
      port: 8080
    },
      
}