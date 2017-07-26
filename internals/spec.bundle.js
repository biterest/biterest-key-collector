/*
 * spec.bundle.js
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

const chai = require('chai')
const chaiEnzyme = require('chai-enzyme')
const sinonChai = require('sinon-chai')

/*
 * Setup
 * This is the bootstrap code that is run before any tests, utils, mocks.
 */
chai.use(chaiEnzyme())
chai.use(sinonChai)

console.error = (...args) => { throw new Error('console.error was called!\n\n' + args.join(' ')) }

/*
 * When testing with webpack and ES6, we have to do some extra
 * things to get testing to work right. Because we are gonna write tests
 * in ES6 too, we have to compile those as well. That's handled in
 * karma.conf.js with the karma-webpack plugin. This is the entry
 * file for webpack test. Just like webpack will create a bundle.js
 * file for our client, when we run test, it will compile and bundle them
 * all here! Crazy huh. So we need to do some setup
 */
Error.stackTraceLimit = Infinity

/*
 * Ok, this is kinda crazy. We can use the context method on
 * require that webpack created in order to tell webpack
 * what files we actually want to require or import.
 * Below, context will be a function/object with file names as keys.
 * Using that regex we are saying look in ../src then find
 * any file that ends with spec.ts and get its path. By passing in true
 * we say do this recursively
 */
const testContext = require.context('../app', true, /\.spec\.tsx?/)

/*
 * get all the files, for each file, call the context function
 * that will require the file and load it up here. Context will
 * loop and require those spec files here
 */
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext)
}

// requires and returns all modules that match
const modules = requireAll(testContext)
