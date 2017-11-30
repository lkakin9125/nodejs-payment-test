// var webpack = require('webpack');
// var path = require('path');
var path = require('path')
var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'client');

module.exports = [
  {
    name: 'browser',
    entry: [
      'babel-polyfill',
      APP_DIR + '/index.jsx'
    ],
    output: {
      path: BUILD_DIR,
      filename: 'bundle.js'
    },
    resolve: {
      extensions: [ '.js', '.jsx']
    },
    
    module: {
      rules: [
        {
          test: /.jsx?$/,  // Match both .js and .jsx
          loader: 'babel-loader',          
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react']
          }  
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ],
                     
          }
      ]
    }
  }
]