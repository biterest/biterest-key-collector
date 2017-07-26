/*
 * Input.spec.tsx
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
import _ from 'lodash'
import { TextField } from 'office-ui-fabric-react'
import React from 'react'
import sinon from 'sinon'

import { Input } from './Input'

describe('AppHeader', () => {
  describe('children', () => {
    it('renders "TextField"', () => {
      expect(shallow(<Input />))
        .have.type(TextField)
    })
  })

  describe('error', () => {
    it('empty string by default', () => {
      expect(shallow(<Input />))
        .have.prop('errorMessage', '')
    })

    it('passes to "errorMessage"', () => {
      const error = faker.hacker.phrase()

      expect(shallow(<Input error={error} />))
        .have.prop('errorMessage', error)
    })
  })

  describe('icon', () => {
    it('does not defined by default', () => {
      expect(shallow(<Input />))
        .not.have.prop('icon')
    })

    it('passes to "iconProps" as object', () => {
      const iconName = faker.hacker.verb()

      expect(shallow(<Input icon={iconName} />))
        .have.prop('iconProps').deep.equal({ iconName })
    })
  })

  describe('id', () => {
    it('does not defined by default', () => {
      expect(shallow(<Input />))
        .not.have.prop('id')
    })

    it('passes to "id"', () => {
      const id = faker.hacker.phrase()

      expect(shallow(<Input id={id} />))
        .have.prop('id', id)
    })
  })

  describe('label', () => {
    it('does not defined by default', () => {
      expect(shallow(<Input />))
        .not.have.prop('label')
    })

    it('renders element', () => {
      const label = <div>{faker.lorem.paragraph()}</div>

      expect(shallow(<Input label={label} />))
        .have.prop('label', label)
    })

    it('renders string', () => {
      const label = faker.hacker.phrase()

      expect(shallow(<Input label={label} />))
        .have.prop('label', label)
    })
  })

  describe('multiline', () => {
    it('false by default', () => {
      expect(shallow(<Input />))
        .have.prop('multiline', false)
    })

    it('can be true', () => {
      expect(shallow(<Input multiline />))
        .have.prop('multiline', true)
    })
  })

  describe('onBlur', () => {
    it('called with (e, data)', () => {
      const event = { foo: 'bar' }
      const onBlur = sinon.spy()
      const input = mount(<Input onBlur={onBlur} />).find('input')

      input.simulate('focus')
      input.simulate('blur', event)

      expect(onBlur).to.be.callCount(1)
      expect(onBlur).to.be.calledWithMatch(event, { onBlur })
    })
  })

  describe('onChange', () => {
    it('called with (e, data)', () => {
      const id = faker.hacker.phrase()
      const value = faker.hacker.phrase()

      const onChange = sinon.spy()
      const input = mount(<Input id={id} onChange={onChange} />).find('input')

      input.simulate('change', { target: { value } })
      expect(onChange).to.be.callCount(1)
      expect(onChange).to.be.calledWithMatch(
        {
          persist: _.noop,
          target: { id, value },
        },
        { id, onChange, value },
      )
    })
  })

  describe('resizable', () => {
    it('always false', () => {
      expect(shallow(<Input />))
        .have.prop('resizable', false)
    })
  })

  describe('value', () => {
    it('does not defined by default', () => {
      expect(shallow(<Input />))
        .not.have.prop('value')
    })

    it('passes to "value"', () => {
      const value = faker.hacker.phrase()

      expect(shallow(<Input value={value} />))
        .have.prop('value', value)
    })
  })
})
