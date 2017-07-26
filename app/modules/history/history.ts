/*
 * history.ts
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

import settings from 'electron-settings'
import { Dispatch } from 'redux'
import { Action, handleActions } from 'redux-actions'

import { IState } from 'store'
import { IWithdrawTransaction } from 'utils'
import { IHistoryState } from './IHistoryState'

// ------------------------------------
// Constants
// ------------------------------------
const HISTORY_PUSH = 'HISTORY_PUSH'
const HISTORY_RESET = 'HISTORY_RESET'

// ------------------------------------
// Actions
// ------------------------------------
export const push = (transaction: IWithdrawTransaction) =>
  (dispatch: Dispatch<IHistoryState>, getState: () => IState) => {
    const { history: { transactions } } = getState()
    const payload = [transaction, ...transactions]

    settings.set('history', JSON.stringify(payload))
    dispatch({ payload, type: HISTORY_PUSH })
  }

export const reset = () => (dispatch: Dispatch<IHistoryState>) => {
  settings.delete('history')
  dispatch({ type: HISTORY_RESET })
}

// ------------------------------------
// Initial state
// ------------------------------------

const serialized = settings.get('history') as string || '[]'
const initialState: IHistoryState = {
  transactions: JSON.parse(serialized) as any,
}

// ------------------------------------
// Action handlers
// ------------------------------------
export const history = handleActions<IHistoryState, any>(
  {
    [HISTORY_PUSH]: (state, { payload }: Action<IWithdrawTransaction[]>): IHistoryState => ({
      transactions: payload,
    }),
    [HISTORY_RESET]: (): IHistoryState => ({ transactions: [] }),
  },
  initialState,
)
