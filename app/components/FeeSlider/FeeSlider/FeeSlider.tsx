/*
 * FeeSlider.tsx
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
import cx from 'classnames'
import _ from 'lodash'
import React, { Component, MouseEvent } from 'react'

import { EFeeSliderValue } from '../EFeeSliderValue'
import { FeeSliderError } from '../FeeSliderError'
import { FeeSliderLoader } from '../FeeSliderLoader'
import { FeeSliderMarks, IFeeSliderMarksProps } from '../FeeSliderMarks'
import { FeeSliderSlider, IFeeSliderSliderProps } from '../FeeSliderSlider'
import { IFeeSliderProps } from './IFeeSliderProps'
import styles from './FeeSlider.scss'

export class FeeSlider extends Component<IFeeSliderProps> {
  handleMarkClick = (e: MouseEvent<HTMLElement>, { value }: IFeeSliderMarksProps) => {
    _.invoke(this, 'props.onChange', null, { ...this.props, value })
  }

  handleSliderChange = (e: null, { value }: IFeeSliderSliderProps) => {
    _.invoke(this, 'props.onChange', null, { ...this.props, value })
  }

  render() {
    const { error, ready, value } = this.props

    if (error) return <FeeSliderError>{error}</FeeSliderError>
    if (!ready) return <FeeSliderLoader />

    const marks = [
      { name: t`Минимальная`, value: EFeeSliderValue.low },
      { name: t`Средняя`, value: EFeeSliderValue.medium },
      { name: t`Максимальная`, value: EFeeSliderValue.high },
    ]

    return (
      <div className={cx(styles.container, styles.ready)}>
        <FeeSliderSlider onChange={this.handleSliderChange} value={value} />
        <FeeSliderMarks marks={marks} onMarkClick={this.handleMarkClick} value={value} />
      </div>
    )
  }
}
