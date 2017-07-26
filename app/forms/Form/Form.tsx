/*
 * Form.tsx
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

import _ from 'lodash'
import React, { ChangeEvent, Component, FormEvent } from 'react'

import { IFormOptions } from './IFormOptions'
import { IFormProps } from './IFormProps'
import { IFormState } from './IFormState'
import { IFormValues } from './IFormValues'
import { TFormChild } from './TFormChildType'
import { mapFieldsToValues } from './mapFieldsToValues'
import { yupToFormErrors } from './yupToFormErrors'

export const Form = ({ fields, schema }: IFormOptions) =>
  <IOriginalProps extends {}>(Child: (TFormChild<IOriginalProps>)) => {
    return class FormWrapper extends Component<IOriginalProps & IFormProps, IFormState> {
      constructor(props: IOriginalProps & IFormProps) {
        super(props)
        this.state = this.initialState()
      }

      initialState = () => ({
        dirty: false,
        errors: {},
        values: mapFieldsToValues(fields),
        valid: true,
      })

      // ----------------------------------------
      // Event handlers
      // ----------------------------------------

      handleChange = (e: ChangeEvent<any>) => {
        const { values: current } = this.state
        const { target: { id, value } } = e

        const values = { ...current, [id]: value }
        const dirty = _.some(values, value => `${value}`.length > 0)

        this.setState({ dirty, values }, this.validate)
      }

      handleReset = () => {
        this.setState(this.initialState())
        _.invoke(this.props, 'onReset')
      }

      handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        const { valid, values } = this.state

        if (valid) _.invoke(this.props, 'onSubmit', e, values)
      }

      resetForm = () => this.setState(this.initialState())

      // ----------------------------------------
      // Validation
      // ----------------------------------------

      failValidation = (err: any) => this.setState({ errors: yupToFormErrors(err), valid: false })

      passValidation = (dirty: boolean, values: IFormValues) => {
        this.setState({ errors: {}, valid: true })
        if (dirty) _.invoke(this.props, 'onValidationPass', values)
      }

      validate = () => {
        const { dirty, values } = this.state

        schema
          .validate(values, { abortEarly: false })
          .then(() => this.passValidation(dirty, values))
          .catch(this.failValidation)
      }

      // ----------------------------------------
      // Render
      // ----------------------------------------

      render() {
        const { dirty, valid } = this.state

        return (
          <Child
            {...this.props}
            {...this.state}
            handleChange={this.handleChange}
            handleReset={this.handleReset}
            handleSubmit={this.handleSubmit}
            resetForm={this.resetForm}
            valid={dirty && valid}
          />
        )
      }
    }
  }
