/*
 * ManualPanel.spec.tsx
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

import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import { Panel } from '../Panel'
import { ManualPanelContent } from './ManualPanelContent'
import { ManualPanel } from './ManualPanel'

describe('ManualPanel', () => {
  describe('children', () => {
    it('renders "Panel"', () => {
      expect(shallow(<ManualPanel />))
        .have.type(Panel)
    })

    it('renders "ManualPanelContent" into "Panel"', () => {
      expect(shallow(<ManualPanel />).childAt(0))
        .to.contain(<ManualPanelContent />)
    })
  })

  describe('open', () => {
    it('always true', () => {
      expect(shallow(<ManualPanel />))
        .have.prop('open', true)
    })
  })

  describe('onDismiss', () => {
    it('called with (e, data)', () => {
      const onDismiss = sinon.spy()
      const instance = shallow(<ManualPanel onDismiss={onDismiss} />)
        .instance() as any

      instance.handleDismiss()
      expect(onDismiss).to.be.callCount(1)
      expect(onDismiss).to.be.calledWithMatch(null, { onDismiss })
    })
  })
})
