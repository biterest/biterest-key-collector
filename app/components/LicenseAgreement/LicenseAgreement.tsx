/*
 * LicenseAgreement.tsx
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

import cx from 'classnames'
import React, { SFC } from 'react'
import Markdown from 'react-markdown'
import settings from 'electron-settings'

import { ILicenseAgreementProps } from './ILicenseAgreementProps'
import markdown_ru from './LicenseAgreement_ru.md'
import markdown_en from './LicenseAgreement_en.md'
import styles from './LicenseAgreement.scss'

export const LicenseAgreement: SFC<ILicenseAgreementProps> = ({ fixed }) => {
  const classes = cx(
    fixed && styles.fixed,
    styles.container,
  )
  const locale = settings.get('locale')
  let markdown = markdown_en
  if (locale === 'ru') {
    markdown = markdown_ru
  }
  return (
    <div className={classes}>
      <Markdown source={markdown} />
    </div>
  )
}
