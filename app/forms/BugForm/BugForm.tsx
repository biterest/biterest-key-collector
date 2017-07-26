/*
 * BugForm.tsx
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
import { BugFormForm } from './BugFormForm'

export const BugForm = Form({
  fields: ['email', 'message'],
  schema: Yup.object().shape({
    email: Yup
      .string()
      .email(
        <Span
          content={() => t`Поле должно содержать корректный адрес электронной почты.`}
        /> as any,
      )
      .required(<Span content={() => t`Заполните поле`} /> as any),
    message: Yup
      .string()
      .required(<Span content={() => t`Заполните поле`} /> as any),
  }),
})(BugFormForm as any)
