/*
 * ExternalLink.spec.tsx
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
import { shell } from 'electron'
import { shallow, mount } from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import { ExternalLink } from 'components'

const requiredProps = {
  href: faker.internet.url(),
}

describe('ExternalLink', () => {
  describe('children', () => {
    it('renders "a"', () => {
      expect(shallow(<ExternalLink {...requiredProps} />))
        .have.tagName('a')
    })

    it('renders children', () => {
      const children = <div>{faker.lorem.paragraph()}</div>

      expect(shallow(<ExternalLink {...requiredProps}>{children}</ExternalLink>))
        .to.contain(children)
    })
  })

  describe('href', () => {
    it('hides real href', () => {
      expect(shallow(<ExternalLink {...requiredProps} />))
        .have.attr('href', '#')
    })
  })

  describe('onClick', () => {
    let openExternal: any

    beforeEach(() => {
      openExternal = sinon
        .stub(shell, 'openExternal')
        .returnsArg(0)
    })

    afterEach(() => {
      (shell.openExternal as any).restore()
    })

    it('prevents default event', () => {
      const preventDefault = sinon.spy()
      const wrapper = mount(<ExternalLink {...requiredProps} />)

      wrapper.simulate('click', { preventDefault })
      expect(preventDefault).to.be.callCount(1)
    })

    it('calls shell.openExternal()', () => {
      const href = faker.internet.url()
      const wrapper = mount(<ExternalLink href={href} />)

      wrapper.simulate('click', { preventDefault: () => false })
      expect(openExternal).to.be.calledWithMatch(href)
    })
  })
})
