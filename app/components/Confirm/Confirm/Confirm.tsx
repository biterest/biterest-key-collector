/*
 * Confirm.tsx
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
import React, { Component, MouseEvent } from 'react'

import { Button } from 'components/Button'
import { EHomePush } from 'modules/home'
import { ConfirmDetails } from '../ConfirmDetails'
import { ConfirmError } from '../ConfirmError'
import { ConfirmSuccess } from '../ConfirmSuccess'
import { IConfirmProps } from './IConfirmProps'
import { IConfirmState } from './IConfirmState'

export class Confirm extends Component<IConfirmProps, IConfirmState> {
  state = { open: false }

  handleClose = () => this.setState({ open: false })

  handleConfirm = (e: MouseEvent<HTMLElement>) => _.invoke(this, 'props.onConfirm', e, this.props)

  handleFinish =  (e: MouseEvent<HTMLElement>) => {
    this.setState({ open: false })
    _.invoke(this, 'props.onFinish', e, this.props)
  }

  handleOpen = (e: MouseEvent<HTMLElement>) => this.setState({ open: true })

  renderDialog = () => {
    const { errors, push, source, target, transaction, transactions } = this.props
    const { open } = this.state
    const empty = !(source && target)

    if (!open) return null
    if (empty) {
      return (
        <ConfirmError onDismiss={this.handleClose} title={t`Заполните все поля`}>
          {t`Прежде чем перевести залог на другой Bitcoin-адрес, заполните все поля.`}
        </ConfirmError>
      )
    }

    if (_.isEmpty(transactions)) {
      return (
        <ConfirmError
          onDismiss={this.handleClose}
          title={t`Multisig-адрес пуст`}
        >
          {t`Данный multisig-адрес не содержит средств`}
        </ConfirmError>
      )
    }

    if (push === EHomePush.error) {
      return (
        <ConfirmError onDismiss={this.handleFinish} title={t`Ошибка отправки транзакции`}>
          {errors.push}
        </ConfirmError>
      )
    }

    if (push === EHomePush.success) {
      return <ConfirmSuccess onConfirm={this.handleFinish} transaction={transaction} />
    }

    return (
      <ConfirmDetails
        error={errors.push}
        push={push}
        onConfirm={this.handleConfirm}
        onDismiss={this.handleClose}
        transaction={transaction}
      />
    )
  }

  render() {
    const { errors } = this.props
    const disabled = _.some(_.pick(errors, 'fees', 'outputs'))

    return (
      <div>
        {this.renderDialog()}

        <Button
          content={t`Отправить залог`}
          disabled={disabled}
          onClick={!disabled && this.handleOpen}
          primary
        />
      </div>
    )
  }
}
