/*
 * Counter.spec.js
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

import { spy } from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Counter from '../../app/components/Counter';

function setup() {
  const actions = {
    increment: spy(),
    incrementIfOdd: spy(),
    incrementAsync: spy(),
    decrement: spy()
  };
  const component = shallow(<Counter counter={1} {...actions} />);
  return {
    component,
    actions,
    buttons: component.find('button'),
    p: component.find('.counter')
  };
}

describe('Counter component', () => {
  it('should should display count', () => {
    const { p } = setup();
    expect(p.text()).toMatch(/^1$/);
  });

  it('should first button should call increment', () => {
    const { buttons, actions } = setup();
    buttons.at(0).simulate('click');
    expect(actions.increment.called).toBe(true);
  });

  it('should match exact snapshot', () => {
    const { actions } = setup();
    const tree = renderer
      .create(
        <div>
          <Router>
            <Counter counter={1} {...actions} />
          </Router>
        </div>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should second button should call decrement', () => {
    const { buttons, actions } = setup();
    buttons.at(1).simulate('click');
    expect(actions.decrement.called).toBe(true);
  });

  it('should third button should call incrementIfOdd', () => {
    const { buttons, actions } = setup();
    buttons.at(2).simulate('click');
    expect(actions.incrementIfOdd.called).toBe(true);
  });

  it('should fourth button should call incrementAsync', () => {
    const { buttons, actions } = setup();
    buttons.at(3).simulate('click');
    expect(actions.incrementAsync.called).toBe(true);
  });
});
