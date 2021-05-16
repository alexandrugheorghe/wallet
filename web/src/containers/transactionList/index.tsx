import React, { FC } from 'react'
import Transaction from '../../components/transaction'
import Balance from '../../components/balance'
import { useFetchTransactionsAndTotal } from '../../hooks/fetchTransactions'

const TransactionList: FC<any> = () => {
  const {transactions, total, error, isLoading} = useFetchTransactionsAndTotal()

  if (isLoading) {
    return <>Loading</>
  }
  return (
	<>
	  {error ? <code>{error.message}</code> : null}
	  <Balance balance={total} />
	  {transactions.map((transaction, index) => {
		return (
		  <Transaction key={index} value={transaction.value} total={transaction.previousTotal}/>
		)
	  })}
	</>
  )
}

export default TransactionList
