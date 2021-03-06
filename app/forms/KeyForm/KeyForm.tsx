/*
 * KeyForm.tsx
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

import { t } from 'c-3po'
import React from 'react'
import Yup from 'yup'

import { Span } from 'components/Span'
import { Form } from 'forms/Form'
import { validFormValue, validHDPrivateKey, validHDPublicKey } from 'utils'
import { KeyFormForm } from './KeyFormForm'

export const KeyForm = Form({
  fields: ['first', 'second', 'third'],
  schema: Yup.object().shape({
    first: Yup
      .string()
      .test(
        'is-key-first',
        <Span content={() => t`Verify that the key you provided is correct.`} /> as any,
        validFormValue(validHDPrivateKey),
      ),
    second: Yup
      .string()
      .test(
        'is-key-second',
        <Span content={() => t`The field must contain a valid email address.`} /> as any,
        validFormValue(validHDPrivateKey),
      ),
    third: Yup
      .string()
      .test(
        'is-key-third',
        <Span content={() => t`The field must contain a valid email address.`} /> as any,
        validFormValue(validHDPublicKey),
      ),
  }),
})(KeyFormForm as any)
