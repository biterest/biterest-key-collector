/*
 * home.ts
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
import { Dispatch } from 'redux'
import { Action, createAction, handleActions } from 'redux-actions'

import { EFeeSliderValue } from 'components/FeeSlider'
import { push } from 'modules/history'
import { IState } from 'store'
import {
  fetchNetworkFees, fetchUnspentOutputs, formMultisigAddress, formTransaction, sendTransaction,
  INetworkFees, ITransaction, IWithdrawTransaction,
} from 'utils'
import { EHomePush } from './EHomePush'
import { IHomeState } from './IHomeState'

// ------------------------------------
// Constants
// ------------------------------------
const HOME_CREATE_TRANSACTION = 'HOME_CREATE_TRANSACTION'
const HOME_SET_FEE = 'HOME_SET_FEE'
const HOME_SET_TARGET = 'HOME_SET_TARGET'
const HOME_SET_KEYS = 'HOME_SET_KEYS'
const HOME_RESET_KEYS = 'HOME_RESET_KEYS'
const HOME_RESET_ALL = 'HOME_RESET_ALL'

const HOME_LOAD_FEES_ERROR = 'HOME_LOAD_FEES_ERROR'
const HOME_LOAD_FEES_SUCCESS = 'HOME_LOAD_FEES_SUCCESS'

const HOME_LOAD_OUTPUTS_ERROR = 'HOME_LOAD_OUTPUTS_ERROR'
const HOME_LOAD_OUTPUTS_SUCCESS = 'HOME_LOAD_OUTPUTS_SUCCESS'

const HOME_SEND_TRANSACTION_ERROR = 'HOME_SEND_TRANSACTION_ERROR'
const HOME_SEND_TRANSACTION_LOADING = 'HOME_SEND_TRANSACTION_LOADING'
const HOME_SEND_TRANSACTION_SUCCESS = 'HOME_SEND_TRANSACTION_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export const createTx = () => {
  return (dispatch: Dispatch<IHomeState>, getState: () => IState) => {
    const { home } = getState()
    const { fee, fees, keys, target, transactions } = home

    if (!transactions || !target) return

    const name = EFeeSliderValue[fee] as 'low' | 'medium' | 'high'
    const tx = formTransaction(transactions, keys, target, fees[name])

    dispatch({ type: HOME_CREATE_TRANSACTION, payload: tx })
  }
}

export const loadFees = () => {
  return (dispatch: Dispatch<IHomeState>, getState: () => IState) => {
    if (_.has(getState(), 'home.fees')) return
    fetchNetworkFees()
      .then((fees) => {
        dispatch({ type: HOME_LOAD_FEES_SUCCESS, payload: fees })
      })
      .catch(({ message }) => {
        dispatch({ type: HOME_LOAD_FEES_ERROR, payload: message })
      })
  }
}

export const sendTx = () => {
  return (dispatch: Dispatch<IHomeState>, getState: () => IState) => {
    const { home: { transaction } } = getState()

    dispatch({ type: HOME_SEND_TRANSACTION_LOADING })

    sendTransaction(transaction)
      .then(() => {
        push({ ...transaction, date: new Date })(dispatch, getState)

        dispatch({ type: HOME_SEND_TRANSACTION_SUCCESS })
      })
      .catch(({ message }) => {
        dispatch({ type: HOME_SEND_TRANSACTION_ERROR, payload: message })
      })
  }
}

export const setKeys = (keys: string[]) => {
  return (dispatch: Dispatch<IHomeState>, getState: () => IState) => {
    const source = formMultisigAddress(keys)

    dispatch({ type: HOME_SET_KEYS, payload: { keys, source } })

    fetchUnspentOutputs(source)
      .then((transactions) => {
        const { home } = getState()
        const { target, transaction } = home

        dispatch({ type: HOME_LOAD_OUTPUTS_SUCCESS, payload: transactions })
        if (target && !transaction) dispatch(createTx() as any)
      })
      .catch(({ message }) => {
        dispatch({ type: HOME_LOAD_OUTPUTS_ERROR, payload: message })
      })
  }
}

export const setFee = createAction(HOME_SET_FEE)
export const setTarget = createAction(HOME_SET_TARGET)
export const reset = createAction(HOME_RESET_KEYS)
export const resetAll = createAction(HOME_RESET_ALL)

// ------------------------------------
// Initial state
// ------------------------------------

const initialState: IHomeState = {
  errors: {},
  fee: EFeeSliderValue.medium,
  push: EHomePush.wait,
}

// ------------------------------------
// Action handlers
// ------------------------------------
type TPayload = string | EFeeSliderValue | IWithdrawTransaction | INetworkFees | ITransaction[]

export const home = handleActions<IHomeState, TPayload>(
  {
    [HOME_SET_FEE]: (state, { payload }: Action<EFeeSliderValue>) => ({
      ...state,
      fee: payload,
    }),
    [HOME_SET_TARGET]: (state, { payload }: Action<string>) => ({ ...state, target: payload }),

    [HOME_SET_KEYS]: (state, { payload }: Action<any>) => ({ ...state, ...payload }),
    [HOME_RESET_KEYS]: state => ({
      ...state,
      source: undefined,
      keys: undefined,
      transaction: undefined,
      transactions: undefined,
    }),
    [HOME_RESET_ALL]: ({ fees }) => ({ ...initialState, fees }),

    [HOME_CREATE_TRANSACTION]: (state, { payload }: Action<IWithdrawTransaction>) => ({
      ...state,
      transaction: payload,
    }),

    [HOME_LOAD_FEES_ERROR]: (state, { payload }: Action<string>) => {
      const { errors } = state

      return {
        ...state,
        errors: { ...errors, fees: payload },
      }
    },
    [HOME_LOAD_FEES_SUCCESS]: (state, { payload }: Action<INetworkFees>) => {
      const { errors } = state

      return {
        ...state,
        errors: { ...errors, fees: undefined },
        fees: payload,
      }
    },

    [HOME_LOAD_OUTPUTS_ERROR]: (state, { payload }: Action<string>) => {
      const { errors } = state

      return {
        ...state,
        errors: { ...errors, outputs: payload },
      }
    },
    [HOME_LOAD_OUTPUTS_SUCCESS]: (state, { payload }: Action<ITransaction[]>) => {
      const { errors } = state

      return {
        ...state,
        errors: { ...errors, outputs: undefined },
        transactions: payload,
      }
    },

    [HOME_SEND_TRANSACTION_ERROR]: (state, { payload }: Action<string>) => {
      const { errors } = state

      return {
        ...state,
        errors: { ...errors, push: payload },
        push: EHomePush.error,
      }
    },
    [HOME_SEND_TRANSACTION_LOADING]: state => ({ ...state, push: EHomePush.pushing }),
    [HOME_SEND_TRANSACTION_SUCCESS]: (state) => {
      const { errors } = state

      return {
        ...state,
        errors: { ...errors, push: undefined },
        push: EHomePush.success,
      }
    },
  },
  initialState,
)
