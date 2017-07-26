/*
 * sendTransaction.ts
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

import axios from 'axios'
import { t } from 'c-3po'
import _ from 'lodash'

import { IWithdrawTransaction } from './formTransaction'

const makeRequest = async (tx: string) => {
  try {
    return await axios.post(
      'https://api.blockcypher.com/v1/btc/main/txs/push',
      JSON.stringify({ tx }),
    )
  } catch (e) {
    throw new Error(t`Не удалось отправить транзакцию в сеть`)
  }
}

export const sendTransaction = async ({ serialized }: IWithdrawTransaction) => {
  const { data } = await makeRequest(serialized)

  if (_.has(data, 'hash') || _.has(data, 'tx.hash')) return
  throw new Error(t`Не удалось отправить транзакцию в сеть`)
}
