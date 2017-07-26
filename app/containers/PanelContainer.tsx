/*
 * PanelContainer.tsx
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
import React, { Component } from 'react'
import { connect, Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { hidePanel, sendMessage } from 'modules/panel'
import { setLocale } from 'modules/settings'
import { IState } from 'store'
import { BugPanel, LicenseAgreementPanel, ManualPanel, SettingsPanel } from 'components'

const mapStateToProps = ({ panel, settings }: IState) => ({ ...panel, ...settings })
const mapDispatchToProps = (dispatch: Dispatch<IState>) => bindActionCreators({
  hidePanel,
  sendMessage,
  setLocale,
}, dispatch)

export const PanelContainer = connect(mapStateToProps, mapDispatchToProps)(
  class extends Component<any, any> {
    handleSettingsSubmit = (e: null, { locale }: any) => {
      _.invoke(this, 'props.setLocale', locale)
    }

    render() {
      const { active, bug, hidePanel, locale, sendMessage } = this.props

      if (active === 'bug') {
        return (
          <BugPanel
            onDismiss={hidePanel}
            onSubmit={sendMessage}
            state={bug}
          />
        )
      }

      if (active === 'license') return <LicenseAgreementPanel onDismiss={hidePanel} />
      if (active === 'manual') return <ManualPanel onDismiss={hidePanel} />

      if (active === 'settings') {
        return (
          <SettingsPanel
            locale={locale}
            onDismiss={hidePanel}
            onSubmit={this.handleSettingsSubmit}
          />
        )
      }

      return null
    }
  })
