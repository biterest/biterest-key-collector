/*
 * webpack.config.renderer.prod.js
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

import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';
import BabiliPlugin from 'babili-webpack-plugin';
import baseConfig from './webpack.config.base';
import CheckNodeEnv from './internals/scripts/CheckNodeEnv';

CheckNodeEnv('production');

export default merge.smart(baseConfig, {
  devtool: 'source-map',

  target: 'electron-renderer',

  entry: path.join(__dirname, 'app/index.tsx'),

  output: {
    path: path.join(__dirname, 'app/dist'),
    publicPath: '../dist/',
    filename: 'renderer.prod.js'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              useCache: false,
            },
          },
        ],
      },
      // Extract all .global.css to style.css as is
      {
        test: /\.global\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'style-loader',
        })
      },
      // Pipe other styles through css modules and append to style.css
      {
        test: /^((?!\.global).)*\.css$/,
        use: ExtractTextPlugin.extract({
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          }
        }),
      },
      // Add SASS support  - compile all .global.scss files and pipe it to style.css
      {
        test: /\.global\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ],
          fallback: 'style-loader',
        })
      },
      // Add SASS support  - compile all other .scss files and pipe it to style.css
      {
        test: /^((?!\.global).)*\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
          {
            loader: 'sass-loader'
          }]
        }),
      },
    ]
  },

  plugins: [
    new BabiliPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
      openAnalyzer: process.env.OPEN_ANALYZER === 'true'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new ExtractTextPlugin('style.css'),
  ],
});
