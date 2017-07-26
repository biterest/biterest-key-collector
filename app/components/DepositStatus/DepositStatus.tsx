/*
 * DepositStatus.tsx
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

import { ExternalLink } from 'components/ExternalLink'
import { Header } from 'components/Header'
import { Loader } from 'components/Loader'
import { Message } from 'components/Message'
import { IDepositStatusProps } from './IDepositStatusProps'
import styles from './DepositStatus.scss'

export class DepositStatus extends Component<IDepositStatusProps> {
  renderContent = () => {
    const { address, error } = this.props

    if (error) return <Message type='error'>{error}</Message>
    if (address) return this.renderInfo()
    return this.renderLoader()
  }

  renderInfo = () => {
    const { address, transactions } = this.props
    const amount = _.sumBy(transactions, 'amount')

    return (
      <div>
        <Header as='h6' className={styles.header}>{t`Multisig-адрес: ${address}`}</Header>
        <Header as='h6' className={styles.header}>{t`Сумма: ${amount} BTC`}</Header>

        <ExternalLink href={`https://blockchain.info/address/${address}`}>
          {t`Посмотреть на blockchain`}
        </ExternalLink>
      </div>
    )
  }

  renderLoader = () => (
    <Loader>
      {t`Ожидаем...`}<br />
      {t`Значение автоматически отобразится после заполнения полей с ключами`}
    </Loader>
  )

  render() {
    return (
      <div className={styles.container}>
        <Header as='h2' className={styles.title}>{t`Статус залога`}</Header>
        {this.renderContent()}
      </div>
    )
  }
}
