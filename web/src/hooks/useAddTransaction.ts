import { useState } from 'react'
import config from '../config'

export function useAddTransaction() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error>()
  const addTransaction = async (value: number) => {
    setIsLoading(true)
	const headers = new Headers()
	headers.append("Content-Type", "application/json")
	fetch(config.backendURL + `/api/transactions`, {
	  method: 'POST',
	  headers,
	  body: JSON.stringify({ value })
	})
	.then(async response => {
	  if (response.status === 500) {
		const text = await response.text()
		throw new Error(text)
	  }
	  return response
	})
	.catch(error => setError(error))
	.then(() => setIsLoading(false))
  }

  return { addTransaction, error, isLoading }
}
