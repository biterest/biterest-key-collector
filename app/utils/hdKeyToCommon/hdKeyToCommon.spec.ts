/*
 * hdKeyToCommon.spec.ts
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
import { hdPrivateToCommon, hdPublicToCommon } from './hdKeyToCommon'

/* tslint:disable */
const hdPrivateKey = 'xprv9s21ZrQH143K3nAbVxLoTro5Fxd2i5ijYdyuGoLNwKerpzrux5EDP3q46sUovPbD2PAdM38XqyxN6XsmLRpFmeLjgWTHUF16f4EkRCmLgbX'
const commonPrivateKey = 'f92976d9849a90eeffdaa76fdc6230e1ca895eecdfda06f684d0269746e3809c'

const hdPublicKey = 'xpub661MyMwAqRbcGGF4bysopzjoozTX7YSauruW5BjzVfBqhoC4VcYTvr9Xx7VRiWJ5aRhvUVEVMUfKjcziDpxdNPjcncyxNxHAaCGGX8edW9R'
const commonPublicKey = '02dd3a5c45c154c50cd208fd1e1d0542f9849e9c8e58cbe0b045dd3076cc66a260'
/* tslint:enable */

describe('hdPrivateToCommon', () => {
  it('converts key', () => {
    expect(hdPrivateToCommon(hdPrivateKey))
      .to.equal(commonPrivateKey)
  })
})

describe('hdPublicToCommon', () => {
  it('converts key', () => {
    expect(hdPublicToCommon(hdPublicKey))
      .to.equal(commonPublicKey)
  })
})
