/*
 * FeeSliderMark.spec.tsx
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
import { shallow, mount } from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import { EFeeSliderValue } from '../EFeeSliderValue'
import { FeeSliderMark } from './FeeSliderMark'
import styles from './FeeSliderMark.scss'

const requiredProps = {
  name: faker.hacker.verb(),
  onClick: () => false,
  value: EFeeSliderValue.low,
}

describe('FeeSliderMark', () => {
  describe('active', () => {
    it('adds className when true', () => {
      expect(shallow(<FeeSliderMark active />))
        .have.className(styles.active)
    })

    it('does not add className when false', () => {
      expect(shallow(<FeeSliderMark {...requiredProps} active={false} />))
        .not.have.className(styles.active)
    })
  })

  describe('children', () => {
    it('renders "div"', () => {
      expect(shallow(<FeeSliderMark />))
        .have.tagName('div')
    })
  })

  describe('name', () => {
    it('renders as children', () => {
      expect(shallow(<FeeSliderMark {...requiredProps} />))
        .have.text(requiredProps.name)
    })
  })

  describe('onClick', () => {
    it('called with (e, data)', () => {
      const event = { foo: 'bar' }
      const onClick = sinon.spy()
      const wrapper = mount(<FeeSliderMark {...requiredProps} onClick={onClick} />)

      wrapper.simulate('click', event)
      expect(onClick).to.be.callCount(1)
      expect(onClick).to.be.calledWithMatch(event, { ...requiredProps, onClick })
    })
  })

  describe('value', () => {
    it('adds className when "medium"', () => {
      expect(shallow(<FeeSliderMark {...requiredProps} value={EFeeSliderValue.medium} />))
        .have.className(styles.center)
    })

    it('adds className when "high"', () => {
      expect(shallow(<FeeSliderMark {...requiredProps} value={EFeeSliderValue.high} />))
        .have.className(styles.right)
    })
  })
})
