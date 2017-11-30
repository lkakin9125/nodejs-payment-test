// var webpack = require('webpack');
// var path = require('path');
var path = require('path')
var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'client');

module.exports = [
  {
    name: 'browser',
    entry: APP_DIR + '/index.jsx',
    output: {
      path: BUILD_DIR,
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            }
          ]
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ],
                     
          }
      ]
    }
  }
]