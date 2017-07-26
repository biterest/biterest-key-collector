/*
 * AgreementPage.tsx
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

import { AppHeader, Button, Layout, LicenseAgreement, Message, NavMenu } from 'components'
import { GITHUB_URL } from 'utils/constants'

export class AgreementPage extends Component<any, any> {
  computeItems = () => ([
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

  render() {
    const { signAgreement } = this.props

    return (
      <Layout.Grid>
        <Layout.Row>
          <Layout.Column position='left'>
            <AppHeader />
            <NavMenu items={this.computeItems()}/>
          </Layout.Column>
          <Layout.Column position='center-right'>
            <Message>
              {t`Программа Key Collector позволяет забрать залог, размещенный на multisig-адресе и
                 переслать его на указанный вами Bitcoin-адрес. Для получения залога вам
                 необходимы ключи, полученные при работе с кредитной заявкой на Biterest.
              `}
            </Message>
            <LicenseAgreement fixed />

            <Button
              content={t`Принять`}
              onClick={signAgreement}
              primary
            />
          </Layout.Column>
        </Layout.Row>
      </Layout.Grid>
    )
  }
}
