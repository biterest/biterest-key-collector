/*
 * HomePage.tsx
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
import { t } from 'c-3po'
import React, { Component } from 'react'

import {
  AppHeader,
  BottomMenu,
  Confirm,
  DepositStatus,
  Divider,
  FeeSlider,
  Layout,
  Message,
  NavMenu,
} from 'components'
import { HistoryContainer, PanelContainer } from 'containers'
import { AddressForm, KeyForm } from 'forms'
import { IFormValues } from 'forms/Form'
import { GITHUB_URL } from 'utils/constants'

export class HomePage extends Component<any, any> {
  addressRef: any
  keysRef: any

  state = {
    address: '',
  }

  computeItems = ({ onPanelShow }: any) => ([
    {
      icon: 'settings',
      key: 'settings',
      name: t`Настройки`,
      onClick: () => onPanelShow('settings'),
    },
    {
      icon: 'help',
      key: 'manual',
      name: t`Инструкция`,
      onClick: () => onPanelShow('manual'),
    },
    {
      icon: 'bug',
      key: 'bug',
      name: t`Сообщить о проблеме`,
      onClick: () => onPanelShow('bug'),
    },
    {
      icon: 'www',
      key: 'website',
      name: t`Cайт Biterest`,
      url: 'https://biterest.com',
    },
    {
      icon: 'github',
      key: 'source',
      name: t`Исходный код`,
      url: GITHUB_URL,
    },
  ])

  // ----------------------------------------
  // Event handlers
  // ----------------------------------------

  handleAddressValidationPass = ({ address: next }: IFormValues) => {
    const { onTargetChange } = this.props
    const { address: current } = this.state

    if (current === next) return
    this.setState({ address: next })
    onTargetChange({ address: next })
  }

  handleKeysValidationPass = (values: IFormValues) => {
    const { onKeysChange } = this.props
    const current = _.pick(this.state, 'first', 'second', 'third')
    const next = _.pick(values, 'first', 'second', 'third')

    if (_.isEqual(current, next)) return
    this.setState({ ...next })
    onKeysChange(next)
  }

  handleFinish = () => {
    const { onFinish } = this.props

    this.addressRef.resetForm()
    this.keysRef.resetForm()
    this.setState({
      address: '',
    })

    onFinish()
  }

  handleReset = () => {
    const { onReset } = this.props
    const { address } = this.state

    this.setState({ address })
    onReset()
  }

  // ----------------------------------------
  // Refs
  // ----------------------------------------

  handleAddressRef = (c: any) => this.addressRef = c

  handleKeysRef = (c: any) => this.keysRef = c

  render() {
    const {
      errors, fee, fees, push, source, target, transaction, transactions,
      onConfirm, onFeeChange,
    } = this.props

    return (
      <Layout.Grid>
        <Layout.Row>
          <Layout.Column position='left'>
            <AppHeader/>
            <NavMenu items={this.computeItems(this.props)}/>
            <BottomMenu />
          </Layout.Column>

          <Layout.Column position='center'>
            <Message>
              {t`Укажите ключи для проверки наличия средств на multisig-адресе. Для отправки
                 средств, дополнительно укажите ваш Bitсoin-адрес и подтвердите операцию.
              `}
            </Message>

            <KeyForm
              onValidationPass={this.handleKeysValidationPass}
              onReset={this.handleReset}
              ref={this.handleKeysRef}
            />
            <Divider/>
            <AddressForm
              onValidationPass={this.handleAddressValidationPass}
              ref={this.handleAddressRef}
            />

            <FeeSlider
              error={errors.fees}
              onChange={onFeeChange}
              ready={!!fees}
              value={fee}
            />

            <Confirm
              errors={errors}
              onConfirm={onConfirm}
              onFinish={this.handleFinish}
              push={push}
              source={source}
              target={target}
              transaction={transaction}
              transactions={transactions}
            />
          </Layout.Column>

          <Layout.Column position='right'>
            <DepositStatus
              address={source}
              error={errors.outputs}
              transactions={transactions}
            />

            <HistoryContainer />
            <PanelContainer />
          </Layout.Column>
        </Layout.Row>
      </Layout.Grid>
    )
  }
}
