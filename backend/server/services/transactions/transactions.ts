import { Dependencies } from './types'
import {
  InsufficientBalanceError,
  InvalidTransactionValueError
} from './errors'
import { Document } from 'mongoose'
import { TransactionModel } from '../../repositories/transactions'

interface TransactionService {
  createTransaction: (value: number) => Promise<Document<TransactionModel, any>>
  getAllTransaction: () => Promise<Document<TransactionModel, any>[]>
  getTotal: () => Promise<number>
}

const TransactionsServiceFactory = (dependencies: Dependencies): TransactionService => {
  const { transactionGateway } = dependencies
  return {
    createTransaction: async (value: number) => {
      if (!value) {
        throw new InvalidTransactionValueError(value)
	  }
      const total = await transactionGateway.getTotal()
	  if (total + value < 0) {
		throw new InsufficientBalanceError(value)
	  }
      return transactionGateway.createTransaction(value)
	},
	getAllTransaction: () => {
      return transactionGateway.getAllTransactions()
	},
	getTotal: () => {
      return transactionGateway.getTotal()
	}
  }
}

export default TransactionsServiceFactory
