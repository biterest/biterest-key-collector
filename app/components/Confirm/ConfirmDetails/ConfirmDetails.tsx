/*
 * ConfirmDetails.tsx
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
import React, { Component } from 'react'

import { Message } from 'components/Message'
import { EHomePush } from 'modules/home'
import { ConfirmDialog } from '../ConfirmDialog'
import { ConfirmTable } from '../ConfirmTable'
import { IConfirmDetailsProps } from './IConfirmDetailsProps'

export class ConfirmDetails extends Component<IConfirmDetailsProps> {
  computeButtons = () => {
    const loading = this.pushing()

    return [
      { content: t`Отказаться`, disabled: loading, name: 'cancel', onClick: this.handleDismiss },
      {
        loading,
        content: t`Подтвердить перевод средств`,
        name: 'confirm',
        onClick: this.handleConfirm,
        primary: true,
      },
    ]
  }

  handleConfirm = () => _.invoke(this, 'props.onConfirm', null, this.props)

  handleDismiss = () => !this.pushing() && _.invoke(this, 'props.onDismiss', null, this.props)

  pushing = () => this.props.push === EHomePush.pushing

  render() {
    const { transaction } = this.props

    return (
      <ConfirmDialog
        buttons={this.computeButtons()}
        closeIcon={!this.pushing()}
        onDismiss={this.handleDismiss}
        title={t`Подтвердите перевод средств`}
      >
        <Message>
          {t`Скорость зачисления средств зависит от работы сети blokchain (обычно составляет до
             4 часов). После подтверждения перевода средств - операция не обратима.
          `}
        </Message>
        <ConfirmTable transaction={transaction} />
      </ConfirmDialog>
    )
  }
}
