/*
 * CheckBox.ts
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

import { Checkbox } from 'office-ui-fabric-react'
import React, { ChangeEvent, Component } from 'react'
import styles from './CheckBox.scss'

import { ICheckBoxProps } from './ICheckBoxProps'
import _ from 'lodash'

export class CheckBox extends Component<ICheckBoxProps> {
  static defaultProps = {
    checked: false,
  }

  handleChecked = (ev: ChangeEvent<any>, checked: boolean) => {
    const value = checked
    const { id } = this.props
    const e = {
      persist: _.noop,
      target: { id, value },
    }

    _.invoke(this, 'props.onChange', e, { ...this.props, value })
  }

  render() {
    const { checked, id, label } = this.props

    return (
            <Checkbox
                className={styles.container}
                id={id}
                label={label as string}
                onChange={this.handleChecked}
                checked={checked}
            />
    )
  }

}
