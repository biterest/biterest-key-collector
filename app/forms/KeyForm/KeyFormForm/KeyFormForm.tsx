/*
 * KeyFormForm.tsx
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

import { Button, Header, Input, Label } from 'components'
import { IKeyFormFormProps } from './IKeyFormFormProps'
import { IKeyFormFormState } from './IKeyFormFormState'
import styles from './KeyFormForm.scss'

export class KeyFormForm extends Component<IKeyFormFormProps, IKeyFormFormState> {
  render() {
    const { errors = {}, handleChange, handleReset, handleSubmit, values } = this.props

    const firstLabel = (
      <Label
        hint={t`Укажите Приватный ключ, созданный Biterest для данной кредитной заявки. Выдается
                после завершения кредитной сделки
              `}
      >
        {t`Приватный ключ Biterest`}
      </Label>
    )
    const secondLabel = (
      <Label
        hint={t`Укажите Приватный ключ, сохраненный вами для доступа к залогу данной кредитной
                заявки
              `}
      >
        {t`Ваш Приватный ключ`}
      </Label>
    )
    const thirdLabel = (
      <Label
        hint={t`Укажите Открытый ключ другой стороны сделки. Выдается вместе с Приватным ключом
                Biterest после завершения кредитной сделки.
              `}>
        {t`Открытый ключ другой стороны`}
      </Label>
    )

    return (
      <form onSubmit={handleSubmit}>
        <Header as='h2' className={styles.header}>
          {t`Проверка средств на multisig-адресе`}
        </Header>

        <Input
          error={errors.first || ''}
          id='first'
          icon='key'
          label={firstLabel}
          onChange={handleChange}
          value={values.first}
        />
        <Input
          error={errors.second || ''}
          id='second'
          icon='key'
          label={secondLabel}
          onChange={handleChange}
          value={values.second}
        />
        <Input
          error={errors.third || ''}
          id='third'
          icon='key'
          label={thirdLabel}
          onChange={handleChange}
          value={values.third}
        />

        <Button
          content={t`Сбросить значения`}
          onClick={handleReset}
          position='right'
        />
      </form>
    )
  }
}
