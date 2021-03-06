/*
 * FeeSliderSlider.tsx
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

import { t } from 'c-3po'
import _ from 'lodash'
import { Slider } from 'office-ui-fabric-react'
import React, { Component } from 'react'

import { EFeeSliderValue } from '../EFeeSliderValue'
import { IFeeSliderSliderProps } from './IFeeSliderSliderProps'

export class FeeSliderSlider extends Component<IFeeSliderSliderProps> {
  handleChange = (value: number) => {
    _.invoke(this, 'props.onChange', null, { ...this.props, value })
  }

  render() {
    const { value } = this.props

    return (
      <Slider
        label={t`Bitcoin network commission for transferring funds`}
        min={EFeeSliderValue.low}
        max={EFeeSliderValue.high}
        onChange={this.handleChange}
        showValue={false}
        value={value}
      />
    )
  }
}
