const webpack = require('webpack'); 
const path = require('path');

const parentDir = path.join(__dirname, './');

module.exports = {
  entry: [
    path.join(parentDir, 'client/client.js')
  ],
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.(jpe?g|png|gif|svg|ico)$/i,
      use: [
        {
          loader: 'file-loader'
        }
      ]
    },
    {
      test: /\.html$/,
      use: [
        {
          loader: 'html-loader'
        }
      ]
    }
    ]
  },
  node: {
    net: 'empty',
    dns: 'empty',
  },
  output: {
    path: `${parentDir}/client`,
    filename: 'bundle.min.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.resolve(parentDir, 'client'),
    historyApiFallback: true,
    
  },
};
