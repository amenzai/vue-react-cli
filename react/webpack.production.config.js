const webpack = require('webpack');
const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
// var extractCSS = new ExtractTextPlugin('css/[name].css?[contenthash]')
// var cssLoader = extractCSS.extract(['css'])
// var sassLoader = extractCSS.extract(['css', 'sass'])

const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  entry: resolve('src/main.js'),
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: 'js/bundle-[hash].js'
  },
  module: {
    loaders: [{
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
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
        loader: "url-loader?limit=8129&name=img/[hash:8].[name].[ext]"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // new CopyWebpackPlugin([
    //   { from: './src/index.html', to: 'index.html' }
    // ]),
    new CleanWebpackPlugin('dist/*.*', {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: resolve('src/index.html')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin("style.css")
  ]
};