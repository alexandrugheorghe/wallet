import { TransactionGateway } from '../../gateways/transactions'
import { Document } from 'mongoose'
import TransactionsServiceFactory from './transactions'
import { TransactionRepository } from '../../repositories/transactions'

const dummyDocument = (data: any): Document => {
  return new TransactionRepository(data)
}

const transactionGatewayMock: TransactionGateway = {
  createTransaction: async (value) => {
    return dummyDocument({
      id: Math.random(),
	  value
	})
  },
  getAllTransactions: async () => {
    return [
      dummyDocument({
		id: Math.random(),
		value: Math.floor(Math.random() * 1000)
	  }),
	  dummyDocument({
		id: Math.random(),
		value: Math.floor(Math.random() * 1000)
	  }),
	  dummyDocument({
		id: Math.random(),
		value: Math.floor(Math.random() * 1000)
	  })
	]
  },
  getTotal: async () => {
    return Math.floor(Math.random() * 3000)
  }
}

const transactionService = TransactionsServiceFactory({
  transactionGateway: transactionGatewayMock
})

test('.createTransaction with valid amount', async () => {
  const newTransaction = await transactionService.createTransaction(1)
  // @ts-ignore For .value direct access
  expect(newTransaction.value).toBe(1)
})

test('.createTransaction with invalid amount', async () => {
  const value = 'fist'
  // @ts-ignore type violation for passing string instead of number
  const transaction = await transactionService.createTransaction(value).catch(caughtError => {
	expect(caughtError).toBeDefined()
	expect(caughtError.message).toBe(`Invalid transaction value: ${value}`)
	return
  })
  expect(transaction).toBeUndefined()
})

test('.createTransaction with too big negative amount', async () => {
  const value = -100000
  const transaction = await transactionService.createTransaction(value).catch(caughtError => {
	expect(caughtError).toBeDefined()
	expect(caughtError.message).toBe(`Insufficient balance for transaction of value: ${value}`)
	return
  })
  expect(transaction).toBeUndefined()
})

test('.getAllTransactions', async () => {
  const transactions = await transactionService.getAllTransaction()
  expect(transactions.length).toBeGreaterThan(1)
})

test('.getTotal', async () => {
  const total = await transactionService.getTotal()
  expect(Number.isFinite(total)).toBe(true)
})
