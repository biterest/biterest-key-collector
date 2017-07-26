/*
 * bitcore-lib.d.ts
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

declare module 'bitcore-lib' {
  export class Address {
    constructor(key: AddressKeyInput, signatures: number, network: NetworkObject)
    static fromString(address: string): Address

    toString(): string
  }

  type AddressKeyInput = string | string[]

  export class HDPrivateKey {
    hdPublicKey: HDPublicKey
    privateKey: string

    constructor(arg?: string | Object)
    derive(path: string): HDPrivateKey
    toObject(): HDPrivateKeyObject
  }

  export interface HDPrivateKeyObject {
    network: 'testnet' | 'livenet'
  }

  export class HDPublicKey {
    publicKey: string

    constructor(key: string)
    derive(path: string): HDPublicKey
    toObject(): HDPublicKeyObject
  }

  export interface HDPublicKeyObject extends HDPrivateKeyObject {

  }

  export class Networks {
    static livenet: NetworkObject
  }

  export interface NetworkObject {

  }

  export class Transaction {
    hash: string
    outputAmount: number

    constructor()
    _estimateSize(): number // tslint:disable-line
    change(address: string): Transaction
    fee(amount: number): Transaction
    from(outputs: ITransactionOutput[], keys: string[], requiredSigns?: number): Transaction
    serialize(): string
    sign(keys: string | string[]): Transaction
  }

  export interface ITransactionOutput {
    amount: number
    scriptPubKey: string
    txid: string
    vout: number
  }

  export class Unit {
    static fromSatoshis(amount: number | string): Unit
    static fromBTC(amount: number | string): Unit

    toBTC(): number
    toSatoshis(): number
  }
}
