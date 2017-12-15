const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devtool: "eval-source-map",
  entry: resolve('src/main.js'),
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'
      }, {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader?limit=100000'
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader?limit=8129"
      }, {
        test: /\.css$/,
        loader: "postcss-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),
    new HtmlWebpackPlugin({
      template: resolve('src/index.html')
    })
  ]
};