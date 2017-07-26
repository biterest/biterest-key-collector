/*
 * ConfirmSuccess.tsx
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

import { jt, t } from 'c-3po'
import _ from 'lodash'
import React, { Component } from 'react'

import { ExternalLink } from 'components/ExternalLink'
import { Message } from 'components/Message'
import { ConfirmDialog } from '../ConfirmDialog'
import { IConfirmSuccessProps } from './IConfirmSuccessProps'

export class ConfirmSuccess extends Component<IConfirmSuccessProps> {
  handleDismiss = () => _.invoke(this, 'props.onConfirm', null, this.props)

  render() {
    const { transaction: { hash } } = this.props
    const link = (
      <ExternalLink key='blockchain' href={`https://blockchain.info/tx/${hash}`}>
        {t`blockchain`}
      </ExternalLink>
    )

    // tslint:disable:max-line-length
    // Heads up! In jt some incomprehensible problem with line breaks.
    return (
      <ConfirmDialog
        buttons={[{
          content: t`Continue`,
          name: 'cancel',
          onClick: this.handleDismiss,
          primary: true,
        }]}
        onDismiss={this.handleDismiss}
        title={t`Transaction sent`}
      >
        <Message type='success'>
          {jt`You have transferred the collateral to your specified Bitcoin-address. You can monitor the transaction status in ${ link }.`}
        </Message>
      </ConfirmDialog>
    )
    // tslint:enable:max-line-length
  }
}
