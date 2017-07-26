/*
 * BugPanel.tsx
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
import { Panel } from 'components/Panel'
import { BugForm, IBugFormValues } from 'forms'
import { EPanelBug } from 'modules/panel'
import { SUPPORT_URL } from 'utils/constants'
import { IBugPanelProps } from './IBugPanelProps'

export class BugPanel extends Component<IBugPanelProps> {
  handleSubmit = (e: null, { email, message }: IBugFormValues) => {
    const { state } = this.props

    if (state !== EPanelBug.sending) _.invoke(this, 'props.onSubmit', email, message)
  }

  handleDismiss = () => {
    const { state } = this.props

    if (state === EPanelBug.sending) return
    _.invoke(this, 'props.onDismiss', null, this.props)
  }

  renderMessage = () => {
    const { state } = this.props

    if (state === EPanelBug.error) {
      const link = (
        <ExternalLink href={SUPPORT_URL}>
          {t`форму обратной связи на сайте Biterest`}
        </ExternalLink>
      )

      return (
        <Message type='error'>
          {jt`Не удалось отправить сообщение – повторите попытку позже или обратитесь к
              разработчикам через ${link}.
          `}
        </Message>
      )
    }
    if (state === EPanelBug.success) {
      return (
        <Message type='success'>
          {t`Сообщение отправлено. Мы ответим в ближайшие дни.`}
        </Message>
      )
    }

    return (
      <Message type='warning'>
        {t`Опишите возникшую проблему. Наш ответ будет дан на указанный вами адрес электронной
           почты.
        `}
      </Message>
    )
  }

  render() {
    const { state } = this.props

    return (
      <Panel
        closable={state !== EPanelBug.sending}
        open={true}
        onDismiss={this.handleDismiss}
        headerText={t`Сообщить о проблеме`}
      >
        {this.renderMessage()}
        <BugForm
          loading={state === EPanelBug.sending}
          onSubmit={this.handleSubmit}
        />
      </Panel>
    )
  }
}
