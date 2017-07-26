/*
 * webpack.config.test.js
 *
 * Biterest Key Collector
 * Copyright (c) 2018 All Rights Reserved by Biterest (https://biterest.com/)
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

import ExtractTextPlugin from 'extract-text-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'

import CheckNodeEnv from './internals/scripts/CheckNodeEnv'
import baseConfig from './webpack.config.base'

CheckNodeEnv('test')

const dll = path.resolve(process.cwd(), 'dll')
const manifest = path.resolve(dll, 'renderer.json')

export default merge.smart(baseConfig, {
  devtool: 'inline-source-map',

  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true,
  },

  target: 'electron-renderer',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              transpileOnly: true,
              useBabel: true,
              useCache: true,
            },
          },
        ],
      },
      {
        enforce: 'post',
        test: /\.tsx?$/,
        loader: 'istanbul-instrumenter-loader',
        exclude: [
          /\.spec\.tsx?$/,
          /node_modules/,
        ]
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              sourceMap: true,
            },
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              sourceMap: true,
            },
          },
          'sass-loader',
        ]
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'test'),
    }),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(manifest),
      sourceType: 'var',
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  resolve: {
    alias: {
      sortobject: 'sortobject/es2015/index.js',
    },
  },

  node: {
    __dirname: false,
    __filename: false
  },
});
