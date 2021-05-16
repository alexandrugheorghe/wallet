import { useEffect, useState } from 'react'
import { TransactionItem } from '../containers/transactionList/types'
import config from '../config'

export function useFetchTransactionsAndTotal() {
  const [transactions, setTransactions] = useState<TransactionItem[]>([])
  const [total, setTotal] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error>()
  useEffect(() => {
	fetch(config.backendURL + `/api/transactions`, )
	.then(response => response.json())
	.then(jsonResponse => {
	  setTransactions(jsonResponse.transactions)
	  setTotal(jsonResponse.total)
	})
	.catch(error => setError(error))
	.then(() => setIsLoading(false))
  }, [])
  return { transactions, total, error, isLoading }
}
