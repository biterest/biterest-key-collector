/*
 * Input.tsx
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

import _ from 'lodash'
import { TextField } from 'office-ui-fabric-react'
import React, { Component, FocusEvent } from 'react'

import { IInputProps } from './IInputProps'
import styles from './Input.scss'

export class Input extends Component<IInputProps> {
  static defaultProps = {
    error: '',
    multiline: false,
  }

  handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    _.invoke(this, 'props.onBlur', e, this.props)
  }

  handleChange = (value: string) => {
    const { id } = this.props
    const e = {
      persist: _.noop,
      target: { id, value },
    }

    _.invoke(this, 'props.onChange', e, { ...this.props, value })
  }

  render() {
    const { error, icon, id, label, multiline, value } = this.props

    return (
      <TextField
        className={styles.container}
        errorMessage={error}
        iconProps={icon && { iconName: icon }}
        id={id}
        label={label as string}
        multiline={multiline}
        onBlur={this.handleBlur}
        onChanged={this.handleChange}
        resizable={false}
        value={value}
      />
    )
  }
}
