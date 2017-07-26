/*
 * Icon.spec.tsx
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
import { mount, shallow } from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import { Icon } from './Icon'

const requiredProps = {
  name: 'info',
}

describe('Icon', () => {
  describe('children', () => {
    it('renders "i"', () => {
      expect(shallow(<Icon {...requiredProps} />))
        .have.tagName('i')
    })

    it('does not render children', () => {
      expect(shallow(<Icon {...requiredProps} />))
        .to.be.blank()
    })
  })

  describe('aria', () => {
    it('adds aria-hidden', () => {
      expect(shallow(<Icon {...requiredProps} />))
        .have.prop('aria-hidden', 'true')
    })

    it('adds aria-hidden', () => {
      expect(shallow(<Icon {...requiredProps} />))
        .have.prop('role', 'presentation')
    })
  })

  describe('data', () => {
    it('data-icon-name', () => {
      expect(shallow(<Icon {...requiredProps} />))
        .have.prop('data-icon-name', 'info')
    })
  })

  describe('className', () => {
    it('adds ms-Icon', () => {
      expect(shallow(<Icon {...requiredProps} />))
        .have.className('ms-Icon')
    })

    it('adds custom className', () => {
      const className = faker.random.word()

      expect(shallow(<Icon {...requiredProps} className={className} />))
        .have.className(className)
    })
  })

  describe('innerRef', () => {
    it('called with root node', () => {
      const innerRef = sinon.spy()
      const wrapper = mount(<Icon {...requiredProps} innerRef={innerRef}/>)

      expect(innerRef).have.callCount(1)
      expect(innerRef).have.calledWithMatch(wrapper.getDOMNode())
    })
  })

  describe('onClick', () => {
    it('called with (e, data)', () => {
      const event = { foo: 'bar' }
      const onClick = sinon.spy()
      const wrapper = mount(<Icon {...requiredProps} onClick={onClick} />)

      wrapper.simulate('click', event)
      expect(onClick).to.be.callCount(1)
      expect(onClick).to.be.calledWithMatch(event, requiredProps)
    })
  })
})
