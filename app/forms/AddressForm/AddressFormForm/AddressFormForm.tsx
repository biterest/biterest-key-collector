/*
 * AddressFormForm.tsx
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
import React, { SFC } from 'react'

import { Header, Input, Label } from 'components'
import { IAddressFormFormProps } from './IAddressFormFormProps'
import styles from './AddressFormForm.scss'

export const AddressFormForm: SFC<IAddressFormFormProps> = (props) => {
  const { errors = {}, handleChange, handleSubmit, values } = props
  const label = (
    <Label
      hint={t`Укажите Bitcoin-адрес на который будет перечислен залог. Внимание! Будет перечислена
             вся сумма. Из сумма будет списана комиссия сети Bitcoin.
             Операция не обратима – внимательно
             проверьте адрес, на который будет переведен залог.
            `}>
      {t`Bitcoin-адрес для перечисления залога`}
    </Label>
  )

  return (
    <form onSubmit={handleSubmit}>
      <Header as='h2' className={styles.header}>{t`Перевод средств`}</Header>

      <Input
        error={errors.address || ''}
        id='address'
        icon='bitcoin'
        label={label}
        onChange={handleChange}
        value={values.address}
      />
    </form>
  )
}
