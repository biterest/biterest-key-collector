/*
 * panel.ts
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

import { Dispatch } from 'react-redux'
import { Action, createAction, handleActions } from 'redux-actions'

import { sendBug } from 'utils'
import { EPanelBug } from './EPanelBug'
import { IPanelState } from './IPanelState'

// ------------------------------------
// Constants
// ------------------------------------
const PANEL_HIDE = 'PANEL_HIDE'
const PANEL_SHOW = 'PANEL_SHOW'

const PANEL_SEND_BUG_ERROR = 'PANEL_SEND_BUG_ERROR'
const PANEL_SEND_BUG_LOADING = 'PANEL_SEND_BUG_LOADING'
const PANEL_SEND_BUG_SUCCESS = 'PANEL_SEND_BUG_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export const sendMessage = (email: string, message: string, os: boolean) => {
  return (dispatch: Dispatch<IPanelState>) => {
    dispatch({ type: PANEL_SEND_BUG_LOADING })
    sendBug(email, message, os)
      .then(() => dispatch({ type: PANEL_SEND_BUG_SUCCESS }))
      .catch(({ message }) => dispatch({ type: PANEL_SEND_BUG_ERROR, payload: message }))
  }
}

export const hidePanel = createAction(PANEL_HIDE)
export const showPanel = createAction(PANEL_SHOW)

// ------------------------------------
// Initial state
// ------------------------------------

const initialState: IPanelState = {
  active: undefined,
  bug: EPanelBug.wait,
}

// ------------------------------------
// Action handlers
// ------------------------------------
export const panel = handleActions<IPanelState, any>(
  {
    [PANEL_HIDE]: (): IPanelState => initialState,
    [PANEL_SHOW]: (state, { payload }: Action<string>): IPanelState => ({
      ...state,
      active: payload,
    }),

    [PANEL_SEND_BUG_ERROR]: state => ({ ...state, bug: EPanelBug.error }),
    [PANEL_SEND_BUG_LOADING]: state => ({ ...state, bug: EPanelBug.sending }),
    [PANEL_SEND_BUG_SUCCESS]: state => ({ ...state, bug: EPanelBug.success }),
  },
  initialState,
)
