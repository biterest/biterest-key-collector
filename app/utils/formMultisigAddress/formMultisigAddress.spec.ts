/*
 * formMultisigAddress.spec.ts
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

import { formMultisigAddress } from './formMultisigAddress'

/* tslint:disable */
const keys = [
  'xpub661MyMwAqRbcG9N2ZaLbvTgJVLuRSXzTYKTBUXwgmHRyXkzyA4JFexJpJvYN4rSe4oFSDjyM3fDWGhjq713igqb6YHP9wwaVMgWjLJnGfx2',
  'xpub661MyMwAqRbcFMog2gAzdmeQKcBJEpuVCzMLCNmSR2CjUQ5Y7Ru5xsnLJ258V3X8LvfZaofp7fxdGChtWoKhCNreEWjwCWCzammv4mYAdt5',
  'xpub661MyMwAqRbcFT6kzwecwCbGX6Pc84JUA4DBPh6vekgxHNK7msZKoDRBVoqvZ96Tn8rS4TBtLtZKDDADRRqNvFmVUuVJ9QnvYsdX7MVhErf',
]
const realKeys = {
  stock: 'xprv9yNEZ4jmZ1UvNqr8NZGxL37ceQH574agBx8xVJsYgxUdcvkgcbCcU5iekCgMZ8jYCi4XbrrW5VLS9Zv3NVHqQujFmwUwNfomVME71pt4ypi',
  creditor: 'xprv9s21ZrQH143K3Asw83WBptsqgs88br2ER57fPjaNFjVPNxe1jnvdtQ9DBwVdiRUteZhHtPKwbdLoTUcMTjVCHWZkZGqqdAMM5nQc9Q21MQ5',
  borrower: 'xpub661MyMwAqRbcGr1AWEqwoyUicFuU4Txb5un5cWTyGEPmfYqCVdAQcGf98dwTqbpHcp8jSbvGvJPMU7eSQ7rgu5JW3wkV9QWkH1z9FLguuJa',
}
/* tslint:enable */

describe('formMultisigAddress', () => {
  it('forms a multisig address', () => {
    expect(formMultisigAddress(keys))
      .to.equal('33YP4RGyijfcr2LA6HbodU8jAvrahMgSJK')
  })

  it('forms a multisig address from real keys', () => {
    expect(formMultisigAddress(_.values(realKeys)))
      .to.equal('345zJrNcoyUbfSey2maDKXYYAstGTDddHf')
  })

  it('forms a multisig address from real keys in random order', () => {
    const shuffleKeys = [realKeys.creditor, realKeys.stock, realKeys.borrower]

    expect(formMultisigAddress(shuffleKeys))
      .to.equal('345zJrNcoyUbfSey2maDKXYYAstGTDddHf')
  })
})
