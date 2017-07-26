/*
 * FeeSliderError.spec.tsx
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

import { Message } from 'components'
import { FeeSliderError } from './FeeSliderError'

describe('FeeSliderError', () => {
  describe('children', () => {
    it('renders "div"', () => {
      expect(shallow(<FeeSliderError />))
      .have.tagName('div')
    })

    it('renders "Message"', () => {
      const wrapper = shallow(<FeeSliderError />).childAt(0)

      expect(wrapper).have.type(Message)
      expect(wrapper).have.prop('type', 'error')
    })

    it('renders children to "Message"', () => {
      const children = <div>{faker.lorem.paragraph()}</div>

      expect(shallow(<FeeSliderError>{children}</FeeSliderError>).childAt(0))
      .to.contain(children)
    })
  })
})
