/*
 * ConfirmDialog.tsx
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
import React, { MouseEvent, Component } from 'react'

import { Button } from 'components/Button'
import { Dialog } from 'components/Dialog'
import { Loader } from 'components/Loader'
import { IConfirmDialogProps } from './IConfirmDialogProps'

export class ConfirmDialog extends Component<IConfirmDialogProps> {
  handleDismiss = (e: MouseEvent<HTMLButtonElement>) => {
    _.invoke(this, 'props.onDismiss', e, this.props)
  }

  renderContent = () => {
    const { children, loading } = this.props

    if (loading) return <Loader>{children}</Loader>
    return children
  }

  render() {
    const { buttons, closeIcon, loading, title } = this.props
    const closable = _.isNil(closeIcon) ? !loading : closeIcon

    return (
      <Dialog
        closeIcon={closable}
        onDismiss={this.handleDismiss}
        open
        title={title}
      >
        {this.renderContent()}
        {buttons && (
          <Dialog.Footer>
            {_.map(buttons, ({ name, ...rest }) => <Button {...rest} key={name} />)}
          </Dialog.Footer>
        )}
      </Dialog>
    )
  }
}
