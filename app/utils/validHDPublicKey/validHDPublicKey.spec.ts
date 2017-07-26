/*
 * validHDPublicKey.spec.ts
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

import { expect } from 'chai'
import _ from 'lodash'

import { validHDPublicKey } from './validHDPublicKey'

const values = [
  ['foo', false],
  ['1', false],
  [undefined, false],

  /* tslint:disable */
  ['xprv9s21ZrQH143K2rSsTBiPUkd6PUnmBN8Sbcnb81YrnBWP8RteTsQrHzu8JmTFGQU74zZbuuT5QgmmpFiV9BZz6dg9ymj8A1ffjZSi4unfUgh', false],
  ['xpub661MyMwAqRbcG73sc2g5UgqHF45tJXgYCZDPsxZBn4ZoWP9PQrWo6E9eo24aZmocZWxyddiiddGykLEU8LBeidKiJTetMyBzPjTpSTNXPUk', true],
  /* tslint:enable */
]

describe('validHDPublicKey', () => {
  it('checks key', () => {
    _.each(values, ([value, expectation]: [string, boolean]) => {
      expect(validHDPublicKey(value)).to.equal(expectation)
    })
  })
})
