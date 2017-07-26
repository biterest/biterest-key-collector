/*
 * SettingsPanel.tsx
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
import { Dropdown } from 'office-ui-fabric-react'
import React, { Component } from 'react'

import { Button } from 'components/Button'
import { Panel } from 'components/Panel'
import { LOCALES } from 'utils'
import { ISettingsPanelProps } from './ISettingsPanelProps'
import { ISettingsPanelState } from './ISettingsPanelState'
import styles from './SettingsPanel.scss'

export class SettingsPanel extends Component<ISettingsPanelProps, ISettingsPanelState> {
  constructor(props: ISettingsPanelProps, context: any) {
    super(props, context)

    this.state = { locale: props.locale }
  }

  handleClick = () => {
    const { locale } = this.state

    _.invoke(this, 'props.onSubmit', null, { ...this.props, locale })
  }

  handleChange = ({ key: locale }: any) => this.setState({ locale })

  handleDismiss = () => {
    _.invoke(this, 'props.onDismiss', null, this.props)
  }

  render() {
    const { locale } = this.state

    return (
      <Panel
        open={true}
        onDismiss={this.handleDismiss}
        headerText={t`Settings`}
      >
        <Dropdown
          label={t`Choose language`}
          onChanged={this.handleChange}
          options={LOCALES}
          selectedKey={locale}
        />

        <Button
          className={styles.button}
          content={t`Save`}
          onClick={this.handleClick}
          primary
        />
      </Panel>
    )
  }
}
