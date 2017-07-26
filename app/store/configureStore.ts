/*
 * configureStore.ts
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

import { createHashHistory } from 'history'
import { Store } from 'react-redux'
import { routerActions, routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from 'reducers'
import { IState } from './IState'

export const history = createHashHistory()

export const configureStore = (): Store<IState> => {
  // Redux Configuration
  const middleware = []
  const enhancers = []

  // Thunk Middleware
  middleware.push(thunk)

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  })
  middleware.push(logger)

  // Router Middleware
  const router = routerMiddleware(history)
  middleware.push(router)

  // Redux DevTools Configuration
  const actionCreators = {
    ...routerActions,
  }
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators,
    })
    : compose

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware))
  const enhancer = composeEnhancers(...enhancers)

  // Create Store
  const store = createStore(rootReducer, {}, enhancer) as Store<IState>

  if ((module as any).hot) {
    (module as any).hot.accept('../reducers', () => store.replaceReducer(require('../reducers')))
  }

  return store
}
