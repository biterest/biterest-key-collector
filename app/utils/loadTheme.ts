/*
 * loadTheme.ts
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

import { loadTheme as vendorTheme } from '@uifabric/styling'

const fonts = {
  tiny: {
    fontFamily: '"Open Sans"',
  },
  xSmall: {
    fontFamily: '"Open Sans"',
  },
  small: {
    fontFamily: '"Open Sans"',
    fontSize: 12,
  },
  smallPlus: {
    fontFamily: '"Open Sans"',
    fontSize: 13,
  },
  medium: {
    fontFamily: '"Open Sans"',
  },
  mediumPlus: {
    fontFamily: '"Open Sans"',
  },
  large: {
    fontFamily: '"Open Sans"',
    fontSize: 17,
    fontWeight: 400,
  },
  xLarge: {
    fontFamily: '"Open Sans"',
    fontSize: 21,
    fontWeight: 600,
  },
  xxLarge: {
    fontFamily: '"Open Sans"',
  },
  superLarge: {
    fontFamily: '"Open Sans"',
  },
  mega: {
    fontFamily: '"Open Sans"',
  },
  icon: {
    fontFamily: '"FontAwesome"',
  },
}

export const loadTheme = () => vendorTheme({ fonts } as any)
