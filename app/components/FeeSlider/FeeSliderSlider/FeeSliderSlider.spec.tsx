/*
 * FeeSliderSlider.spec.tsx
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
import { Slider } from 'office-ui-fabric-react'
import React from 'react'
import sinon from 'sinon'

import { EFeeSliderValue } from '../EFeeSliderValue'
import { FeeSliderSlider } from './FeeSliderSlider'

describe('FeeSliderMark', () => {
  describe('children', () => {
    it('renders "Slider"', () => {
      expect(shallow(<FeeSliderSlider />))
        .have.type(Slider)
    })
  })

  describe('onChange', () => {
    it('called with (e, data)', () => {
      const onChange = sinon.spy()
      const instance = mount(<FeeSliderSlider onChange={onChange} />).instance() as any

      instance.handleChange(EFeeSliderValue.high)

      expect(onChange).to.be.callCount(1)
      expect(onChange).to.be.calledWithMatch(null, { onChange, value: EFeeSliderValue.high })
    })
  })

  describe('value', () => {
    it('passed to "Slider"', () => {
      expect(shallow(<FeeSliderSlider value={EFeeSliderValue.medium} />))
        .have.prop('value', EFeeSliderValue.medium)
    })
  })
})
