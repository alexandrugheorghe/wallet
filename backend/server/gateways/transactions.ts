import {
  TransactionModel,
  TransactionRepository
} from '../repositories/transactions'
import { Document } from 'mongoose'

export interface TransactionGateway {
  createTransaction: (value: number) => Promise<Document<TransactionModel, any>>
  getAllTransactions: () => Promise<Document<TransactionModel, any>[]>
  getTotal: () => Promise<number>
}

const TransactionGatewayFactory = (): TransactionGateway => {
  return {
	createTransaction: (value: number) => {
	  const transaction = new TransactionRepository({
		value
	  })
	  return transaction.save()
	},
	getAllTransactions: () => {
	  return TransactionRepository.find()
	  .exec()
	},
	getTotal: () => {
	  return TransactionRepository.aggregate([
		{
		  $group : {
			_id : null,
			total : {
			  $sum : "$value"
			}
		  }
		}
	  ])
	  .exec()
	  .then(aggregation => {
	    if (!aggregation || aggregation.length === 0) {
	      return 0
		}
	    return aggregation[0].total
	  })
	}
  }
}

export default TransactionGatewayFactory
