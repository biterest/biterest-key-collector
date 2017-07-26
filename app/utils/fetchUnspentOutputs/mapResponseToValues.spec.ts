/*
 * mapResponseToValues.spec.ts
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
import { mapResponseToValues } from './mapResponseToValues'

const input = {
  script: 'script',
  tx_hash: 'tx_hash',
  tx_output_n: 'tx_output_n',
  value: 1,
}

const output = {
  amount: 0.00000001,
  scriptPubKey: 'script',
  txid: 'tx_hash',
  vout: 'tx_output_n',
}

describe('mapResponseToValues', () => {
  it('transforms values', () => {
    expect(mapResponseToValues(input))
      .to.deep.equal(output)
  })
})
