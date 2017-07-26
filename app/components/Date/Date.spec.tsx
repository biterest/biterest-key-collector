/*
 * Date.spec.tsx
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
import { shallow } from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import { Date as Component } from './Date'

const requiredProps = {
  value: new Date,
}

describe('Date', () => {
  describe('children', () => {
    it('renders "span"', () => {
      expect(shallow(<Component {...requiredProps} />))
        .have.tagName('span')
    })

    it('renders formatted date', () => {
      const locale = Component.defaultProps.locale
      const value = new Date
      const text = value.toLocaleString(locale)

      expect(shallow(<Component value={value} />))
        .have.text(text)
    })
  })

  describe('locale', () => {
    const toLocaleString = sinon.spy()
    const value = { toLocaleString } as any

    it('"ru" by default', () => {
      shallow(<Component value={value} />)
      expect(toLocaleString).have.been.calledWithMatch('ru')
    })

    it('passed defined', () => {
      const locale = faker.random.locale()

      shallow(<Component locale={locale} value={value} />)
      expect(toLocaleString).have.been.calledWithMatch(locale)
    })
  })
})
