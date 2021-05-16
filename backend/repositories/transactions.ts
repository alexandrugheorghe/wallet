import { model, Schema } from 'mongoose'

export interface TransactionModel {
  value: number
  createdAt: Date
}

const Transactions = new Schema<TransactionModel>({
  value: Number,
  createdAt: Date
})

export const TransactionRepository = model('Transaction', Transactions)
