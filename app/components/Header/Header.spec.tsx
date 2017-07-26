/*
 * Header.spec.tsx
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
import { shallow } from 'enzyme'
import faker from 'faker'
import _ from 'lodash'
import React from 'react'

import { Header } from 'components'

describe('Header', () => {
  describe('children', () => {
    it('renders "h3" by default', () => {
      expect(shallow(<Header />))
        .have.tagName('h3')
    })

    _.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], (tag: any) => {
      it(`renders "${tag}"`, () => {
        expect(shallow(<Header as={tag} />))
          .have.tagName(tag)
      })
    })

    it('renders children', () => {
      const children = <div>{faker.lorem.paragraph()}</div>

      expect(shallow(<Header>{children}</Header>))
        .to.contain(children)
    })
  })
})
