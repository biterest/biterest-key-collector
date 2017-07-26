/*
 * karma.conf.js
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

require('babel-register')

module.exports = function (config) {
  const webpackConfig = require('./webpack.config.test')

  const configuration = {
    /*
     * Base path that will be used to resolve all patterns (e.g. files, exclude).
     */
    basePath: '',

    /*
     * Frameworks to use, available frameworks:
     * https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: ['mocha'],

    client: {
      captureConsole: false,
      useIframe: false,
    },

    /*
     * List of files / patterns to load in the browser, we are building the test environment
     * in ./spec-bundle.js
     */
    files: [
      { pattern : './dll/renderer.dev.dll.js', watched: false, served: true },
      { pattern: './internals/spec.bundle.js', watched: false },
    ],

    /*
     * Preprocess matching files before serving them to the browser
     * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: {
      './internals/spec.bundle.js': ['coverage', 'webpack', 'electron', 'sourcemap'],
    },

    /*
     * Webpack Config at ./webpack.config.test.js.
     */
    webpack: webpackConfig,

    coverageReporter: {
      type: 'in-memory',
    },

    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html',
    },

    // Webpack please don't spam the console when running in karma!
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i.e.
      noInfo: true,
      // and use stats to turn off verbose output
      stats: {
        // options i.e.
        chunks: false,
      },
    },

    /*
     * test results reporter to use
     *
     * possible values: 'dots', 'progress'
     * available reporters: https://npmjs.org/browse/keyword/karma-reporter
     */
    reporters: ['mocha', 'coverage', 'remap-coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    /*
     * level of logging
     * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_WARN,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    /*
     * start these browsers
     * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: [
      'Electron',
    ],

    /*
     * Continuous Integration mode
     * if true, Karma captures browsers, runs the tests and exits
     */
    singleRun: true,
  }

  config.set(configuration)
}
