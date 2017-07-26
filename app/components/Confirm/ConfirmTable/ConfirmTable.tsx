/*
 * ConfirmTable.tsx
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

import { Header } from 'components/Header'
import { Table } from 'components/Table'
import styles from './ConfirmTable.scss'
import { IConfirmTableProps } from './IConfirmTableProps'

export class ConfirmTable extends Component<IConfirmTableProps> {
  render() {
    const { transaction } = this.props
    const { amount, fees, source, target } = transaction

    return (
      <Table className={styles.container}>
        <Table.Body>
          <Table.Row>
            <Table.Column>
              <Header as='h5' className={styles.header}>{t`Multisig-адрес списания:`}</Header>
            </Table.Column>
            <Table.Column>{source}</Table.Column>
          </Table.Row>
          <Table.Row>
            <Table.Column>
              <Header as='h5' className={styles.header}>{t`Bitcoin-адрес зачисления:`}</Header>
            </Table.Column>
            <Table.Column>{target}</Table.Column>
          </Table.Row>
          <Table.Row>
            <Table.Column>
              <Header as='h5' className={styles.header}>{t`Сумма:`}</Header>
            </Table.Column>
            <Table.Column>{t`${amount} BTC`}</Table.Column>
          </Table.Row>
          <Table.Row>
            <Table.Column>
              <Header as='h5' className={styles.header}>{t`Комиссия сети:`}</Header>
            </Table.Column>
            <Table.Column>{t`${fees.network} BTC`}</Table.Column>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  }
}
