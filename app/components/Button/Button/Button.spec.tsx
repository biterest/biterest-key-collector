/*
 * Button.spec.tsx
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
import faker from 'faker'
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react'
import React from 'react'
import sinon from 'sinon'

import { ButtonContent } from '../ButtonContent'
import { Button } from './Button'
import styles from './Button.scss'

describe('Button', () => {
  describe('children', () => {
    it('renders "DefaultButton" by default', () => {
      expect(shallow(<Button />))
        .have.type(DefaultButton)
    })

    it('renders ButtonContent', () => {
      const children = <div>{faker.lorem.paragraph()}</div>

      expect(shallow(<Button>{children}</Button>).childAt(0))
        .have.type(ButtonContent)
    })
  })

  describe('disabled', () => {
    it('passes prop', () => {
      expect(shallow(<Button disabled />))
        .have.prop('disabled', true)
    })

    it('omits onClick', () => {
      const onClick = sinon.spy()
      const wrapper = mount(<Button disabled onClick={onClick} />)

      wrapper.simulate('click')
      expect(onClick).to.be.callCount(0)
    })
  })

  describe('loading', () => {
    it('passes prop', () => {
      expect(shallow(<Button loading />))
        .have.prop('disabled', true)
    })

    it('omits onClick', () => {
      const onClick = sinon.spy()
      const wrapper = mount(<Button loading onClick={onClick} />)

      wrapper.simulate('click')
      expect(onClick).to.be.callCount(0)
    })
  })

  describe('onClick', () => {
    it('called with (e, data)', () => {
      const event = { foo: 'bar' }
      const onClick = sinon.spy()
      const wrapper = mount(<Button onClick={onClick} />)

      wrapper.simulate('click', event)
      expect(onClick).to.be.callCount(1)
      expect(onClick).to.be.calledWithMatch(event, { onClick })
    })
  })

  describe('primary', () => {
    it('renders "PrimaryButton" by default', () => {
      expect(shallow(<Button primary />))
        .have.type(PrimaryButton)
    })
  })

  describe('position', () => {
    it('adds className when "right"', () => {
      expect(shallow(<Button position='right' />))
        .have.className(styles.right)
    })
  })
})
