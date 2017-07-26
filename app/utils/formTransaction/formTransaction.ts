/*
 * formTransaction.ts
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

import { Transaction } from 'bitcore-lib'
import _ from 'lodash'

import {  estimateNetworkFee } from 'utils/estimateNetworkFee'
import { ITransaction } from 'utils/fetchUnspentOutputs'
import { formMultisigAddress } from 'utils/formMultisigAddress'
import { hdPrivateToCommon, hdPublicToCommon } from 'utils/hdKeyToCommon'
import { toBTC } from 'utils/toBTC'
import { IWithdrawTransaction } from './IWithdrawTransaction'

export const formTransaction = (
  outputs: ITransaction[],
  keys: string[],
  target: string,
  feePerKb: number,
): IWithdrawTransaction => {
  const privateKeys = _.map(_.slice(keys, 0, 2), hdPrivateToCommon)
  const transaction = new Transaction()

  transaction.from(outputs, _.map(keys, hdPublicToCommon), 2)
  transaction.change(target)

  const networkFee = estimateNetworkFee(transaction, feePerKb)

  transaction.fee(networkFee)
  transaction.sign(privateKeys)

  return {
    target,
    amount: toBTC(transaction.outputAmount),
    fees: {
      network: toBTC(networkFee),
    },
    hash: transaction.hash,
    serialized: transaction.serialize(),
    source: formMultisigAddress(keys),
  }
}
