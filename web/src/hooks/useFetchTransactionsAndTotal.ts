import { useEffect, useState } from 'react'
import { TransactionItem } from '../containers/transactionList/types'
import config from '../config'

export function useFetchTransactionsAndTotal() {
  const [transactions, setTransactions] = useState<TransactionItem[]>([])
  const [total, setTotal] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error>()

  const fetchTransactionsAndTotal = async () => {
    setIsLoading(true)
	fetch(config.backendURL + `/api/transactions`, )
	.then(async response => {
	  if (response.status === 500) {
		const text = await response.text()
		throw new Error(text)
	  }
	  return response
	})
	.then(response => response.json())
	.then(jsonResponse => {
	  setTransactions(jsonResponse.transactions)
	  setTotal(jsonResponse.total)
	})
	.catch(error => setError(error))
	.then(() => setIsLoading(false))
  }
  useEffect(() => {
	fetchTransactionsAndTotal()
  }, [])
  return {
    transactions,
	setTransactions,
	total,
	error,
	isLoading,
	fetchTransactionsAndTotal
  }
}
