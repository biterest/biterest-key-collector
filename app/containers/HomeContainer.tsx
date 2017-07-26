/*
 * HomeContainer.tsx
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

import { IFeeSliderProps } from 'components/FeeSlider'
import { IAddressFormValues, IKeyFormValues } from 'forms'
import {
  createTx, loadFees, reset, resetAll, sendTx, setFee, setKeys, setTarget,
} from 'modules/home'
import { showPanel } from 'modules/panel'
import { HomePage } from 'pages'
import { IState } from 'store'

const mapStateToProps = ({ home, settings }: IState) => ({ ...home, ...settings })
const mapDispatchToProps = (dispatch: Dispatch<IState>) => bindActionCreators({
  createTx,
  loadFees,
  reset,
  resetAll,
  sendTx,
  setFee,
  setKeys,
  setTarget,
  showPanel,
}, dispatch)

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(
  class extends Component<any, any> {
    state = {} as any

    componentDidMount() {
      _.invoke(this, 'props.loadFees')
    }

    handleFeeChange = (e: null, { value }: IFeeSliderProps) => {
      _.invoke(this, 'props.setFee', value)
      this.handlePass()
    }

    handleKeysChange = (values: IKeyFormValues) => {
      const keys = _.values(values)

      _.invoke(this, 'props.setKeys', keys)
      this.setState({ keys }, this.handlePass)
    }

    handleTargetChange = ({ address: target }: IAddressFormValues) => {
      _.invoke(this, 'props.setTarget', target)
      this.setState({ target }, this.handlePass)
    }

    handlePass = () => {
      const { target, keys } = this.state

      if (target && keys) _.invoke(this, 'props.createTx')
    }

    handleReset = () => {
      _.invoke(this, 'props.reset')
      this.setState({
        keys: undefined,
        target: undefined,
      })
    }

    handleResetAll = () => {
      _.invoke(this, 'props.resetAll')
      this.setState({
        keys: undefined,
        target: undefined,
      })
    }

    render() {
      const { sendTx, showPanel } = this.props

      return (
        <HomePage
          {...this.props}
          onConfirm={sendTx}
          onFeeChange={this.handleFeeChange}
          onFinish={this.handleResetAll}
          onKeysChange={this.handleKeysChange}
          onPanelShow={showPanel}
          onReset={this.handleReset}
          onTargetChange={this.handleTargetChange}
        />
      )
    }
  })
