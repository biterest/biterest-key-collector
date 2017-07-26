/*
 * BottomMenu.tsx
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
import React, { MouseEvent, Component } from 'react'
import { connect, Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ExternalLink } from 'components/ExternalLink'
import { Icon } from 'components/Icon'
import { Header } from 'components/Header'
import { IState } from 'store'
import { TWITTER_URL } from 'utils/constants'
import styles from './BottomMenu.scss'

import { showPanel } from 'modules/panel'

const mapStateToProps = ({ settings }: IState) => ({ ...settings })

const mapDispatchToProps = (dispatch: Dispatch<IState>) => bindActionCreators(
  { showPanel },
  dispatch,
)

export const BottomMenu = connect(mapStateToProps, mapDispatchToProps)(
  class extends Component<any> {
    handleLicenseClick = (e: MouseEvent<HTMLElement>) => {
      const { showPanel } = this.props

      e.preventDefault()
      showPanel('license')
    }

    render() {
      return (
        <div className={styles.container}>
          <a href='#' onClick={this.handleLicenseClick}>
            {t`Лицензионное соглашение`}
          </a>

          <Header as='h6' className={styles.copyright}>
            All Rights Reserved by Biterest
          </Header>

          <div>
            <ExternalLink href={TWITTER_URL}>
              <Icon className={styles.icon} name='twitter'/>
            </ExternalLink>
          </div>
        </div>
      )
    }
  })
