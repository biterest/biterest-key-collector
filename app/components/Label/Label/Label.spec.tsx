/*
 * Label.spec.tsx
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
import React from 'react'

import { LabelHint } from '../LabelHint'
import { Label } from './Label'

describe('Label', () => {
  describe('children', () => {
    it('renders "div"', () => {
      expect(shallow(<Label/>))
        .have.tagName('div')
    })

    it('renders children', () => {
      const children = <div>{faker.lorem.paragraph()}</div>

      expect(shallow(<Label>{children}</Label>))
        .to.contain(children)
    })

    it('renders "LabelHint"', () => {
      expect(shallow(<Label>foo</Label>).childAt(1))
        .have.type(LabelHint)
    })
  })
})
