/*
 * webpack.config.renderer.dev.js
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

import chalk from 'chalk'
import { spawn, execSync } from 'child_process'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'

import baseConfig from './webpack.config.base'
import CheckNodeEnv from './internals/scripts/CheckNodeEnv'

CheckNodeEnv('development')

const port = process.env.PORT || 1212
const publicPath = `http://localhost:${port}/dist`
const dll = path.resolve(process.cwd(), 'dll')
const manifest = path.resolve(dll, 'renderer.json')

if (!(fs.existsSync(dll) && fs.existsSync(manifest))) {
  console.log(chalk.black.bgYellow.bold(
    'The DLL files are missing. Sit back while we build them for you with "npm run build-dll"'
  ))
  execSync('npm run build-dll')
}

export default merge.smart(baseConfig, {
  devtool: 'inline-source-map',

  target: 'electron-renderer',

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port}/`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'app/index.tsx'),
  ],

  output: {
    publicPath: `http://localhost:${port}/dist/`
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: [
          'react-hot-loader/webpack',
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              useCache: true,
            },
          },
        ],
      },

      {
        test: /\.global\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      },
      {
        test: /^((?!\.global).)*\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
        ]
      },
      {
        test: /\.global\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'sass-loader',
        ]
      },
      {
        test: /^((?!\.global).)*\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(manifest),
      sourceType: 'var',
    }),
    new webpack.HotModuleReplacementPlugin({
      // @TODO: Waiting on https://github.com/jantimon/html-webpack-plugin/issues/533
      // multiStep: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
  ],

  node: {
    __dirname: false,
    __filename: false,
  },

  devServer: {
    port,
    publicPath,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, 'dist'),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
    setup() {
      if (process.env.START_HOT) {
        console.log('Staring Main Process...')
        spawn(
          'npm',
          ['run', 'start-main-dev'],
          { shell: true, env: process.env, stdio: 'inherit' },
        )
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError))
      }
    }
  },
})
