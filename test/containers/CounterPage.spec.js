/*
 * CounterPage.spec.js
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

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import CounterPage from '../../app/containers/CounterPage';
import { configureStore } from '../../app/store/configureStore';

function setup(initialState) {
  const store = configureStore(initialState);
  const history = createBrowserHistory();
  const app = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CounterPage />
      </ConnectedRouter>
    </Provider>
  );
  return {
    app,
    buttons: app.find('button'),
    p: app.find('.counter')
  };
}

describe('containers', () => {
  describe('App', () => {
    it('should display initial count', () => {
      const { p } = setup();
      expect(p.text()).toMatch(/^0$/);
    });

    it('should display updated count after increment button click', () => {
      const { buttons, p } = setup();
      buttons.at(0).simulate('click');
      expect(p.text()).toMatch(/^1$/);
    });

    it('should display updated count after descrement button click', () => {
      const { buttons, p } = setup();
      buttons.at(1).simulate('click');
      expect(p.text()).toMatch(/^-1$/);
    });

    it('shouldnt change if even and if odd button clicked', () => {
      const { buttons, p } = setup();
      buttons.at(2).simulate('click');
      expect(p.text()).toMatch(/^0$/);
    });

    it('should change if odd and if odd button clicked', () => {
      const { buttons, p } = setup({ counter: 1 });
      buttons.at(2).simulate('click');
      expect(p.text()).toMatch(/^2$/);
    });
  });
});
