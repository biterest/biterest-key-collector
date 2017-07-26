/*
 * FeeSliderMarks.spec.tsx
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
import { FeeSliderMark } from '../FeeSliderMark'
import { FeeSliderMarks } from './FeeSliderMarks'

const name = faker.hacker.verb()
const value = EFeeSliderValue.low
const marks = [{ name, value }]

describe('FeeSliderMarks', () => {
  describe('children', () => {
    it('renders "div"', () => {
      expect(shallow(<FeeSliderMarks />))
        .have.tagName('div')
    })
  })

  describe('marks', () => {
    it('renders children elements', () => {
      const mark = shallow(<FeeSliderMarks marks={marks} />).childAt(0)

      expect(mark).have.type(FeeSliderMark)
      expect(mark).have.prop('name', name)
      expect(mark).have.prop('value', value)
    })
  })

  describe('onMarkClick', () => {
    it('called with (e, data)', () => {
      const event = { foo: 'bar' }
      const onMarkClick = sinon.spy()

      mount(<FeeSliderMarks marks={marks} onMarkClick={onMarkClick} value={EFeeSliderValue.high} />)
        .find(FeeSliderMark)
        .first()
        .simulate('click', event)

      expect(onMarkClick).to.be.callCount(1)
      expect(onMarkClick).to.be.calledWithMatch(event, {
        marks,
        onMarkClick,
        value: EFeeSliderValue.low,
      })
    })
  })

  describe('value', () => {
    it('sets active when matches mark\'s value', () => {
      expect(shallow(<FeeSliderMarks marks={marks} value={EFeeSliderValue.low} />).childAt(0))
        .have.prop('active', true)
    })

    it('does not set active when does non match mark\'s value', () => {
      expect(shallow(<FeeSliderMarks marks={marks} value={EFeeSliderValue.high} />).childAt(0))
        .have.prop('active', false)
    })
  })
})
