/*
 * BugFormForm.tsx
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
import React, { Component } from 'react'

import { Button, Input, Label, TextArea } from 'components'
import styles from './BugFormForm.scss'
import { IBugFormFormProps } from './IBugFormFormProps'

export class BugFormForm extends Component<IBugFormFormProps> {
  render() {
    const { errors = {}, handleChange, handleSubmit, loading, values } = this.props

    return (
      <form className={styles.container} onSubmit={handleSubmit}>
        <Input
          error={errors.email || ''}
          id='email'
          icon='email'
          label={<Label>{t`Ваш адрес электронной почты`}</Label>}
          onChange={handleChange}
          value={values.email}
        />
        <TextArea
          error={errors.message || ''}
          id='message'
          label={<Label>{t`Опишите проблему`}</Label>}
          onChange={handleChange}
          value={values.message}
        />

        <Button
          content={t`Отправить`}
          loading={loading}
          onClick={handleSubmit}
          primary
        />
      </form>
    )
  }
}
