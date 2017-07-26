/*
 * TransactionHistory.tsx
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

import { Button } from 'components/Button'
import { Dialog } from 'components/Dialog'
import { Header } from 'components/Header'
import { Message } from 'components/Message'
import { TransactionHistoryItem } from '../TransactionHistoryItem'
import { ITransactionHistoryProps } from './ITransactionHistoryProps'
import { ITransactionHistoryState } from './ITransactionHistoryState'
import styles from './TransactionHistory.scss'

export class TransactionHistory extends Component<
  ITransactionHistoryProps,
  ITransactionHistoryState
  > {
  state = { open: false }

  handleClose = () => this.setState({ open: false })

  handleConfirm = () => {
    this.setState({ open: false })
    _.invoke(this, 'props.onReset')
  }

  handleOpen = () => this.setState({ open: true })

  render() {
    const { transactions } = this.props
    const { open } = this.state

    if (transactions.length === 0) return null
    return (
      <div>
        <Header as='h2'>{t`История транзакций`}</Header>

        <div className={styles.area}>
          {_.map(transactions, ({ hash, ...rest }) => (
            <TransactionHistoryItem
              key={hash}
              transaction={{ hash, ...rest }}
            />
          ))}
        </div>

        <Dialog
          onDismiss={this.handleClose}
          open={open}
          title={t`Подтвердите очистку истории`}
        >
          <Message type='warning'>
            {t`После подтверждения, история транзакций очистится безвозвратно.`}
          </Message>
          <Dialog.Footer>
            <Button content={t`Отказаться`} onClick={this.handleClose} />
            <Button content={t`Подтвердить`} onClick={this.handleConfirm} primary />
          </Dialog.Footer>
        </Dialog>

        <Button
          content={t`Очистить историю`}
          onClick={this.handleOpen}
          position='right'
        />
      </div>
    )
  }
}
