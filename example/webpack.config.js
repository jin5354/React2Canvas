/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'development',
  entry: {
    'app': path.resolve(__dirname, './index.tsx'),
  },
  output: {
    globalObject: 'self',
    filename: '[name].bundle.[hash:8].js',
    path: path.resolve(__dirname, './build'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(ts(x?)|js(x?))$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({overrideBrowserslist: ['> 1%', 'ie >= 9', 'iOS >= 6', 'Android >= 2.1']}),
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|svg)(\?t=\d+)?$/,
        loaders: [{
          loader: 'url-loader?limit=8192'
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      react: path.resolve('./node_modules/react')
    }
  },
  devtool: 'source-map',
  devServer: {
    port: 3006,
    host: '0.0.0.0',
    https: false,
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      chunks:['app'],
      inject: true
    }),
    // new BundleAnalyzerPlugin()
  ],
}