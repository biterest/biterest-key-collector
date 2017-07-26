/*
 * Panel.spec.tsx
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
import { Panel as OfficePanel } from 'office-ui-fabric-react'
import React from 'react'

import { Panel } from './Panel'

describe('Panel', () => {
  describe('children', () => {
    it('renders "Panel" from "office-fabric"', () => {
      expect(shallow(<Panel />))
        .have.type(OfficePanel)
    })

    it('renders children', () => {
      const children = <div>{faker.lorem.paragraph()}</div>

      expect(shallow(<Panel>{children}</Panel>))
        .to.contain(children)
    })
  })

  describe('closable', () => {
    it('passes value to "isLightDismiss" prop', () => {
      expect(shallow(<Panel closable />))
        .have.prop('isLightDismiss', true)
      expect(shallow(<Panel closable={false} />))
        .have.prop('isLightDismiss', false)
    })
  })

  describe('open', () => {
    it('passes value to "isOpen" prop', () => {
      expect(shallow(<Panel open />))
        .have.prop('isOpen', true)
      expect(shallow(<Panel open={false} />))
        .have.prop('isOpen', false)
    })
  })
})
