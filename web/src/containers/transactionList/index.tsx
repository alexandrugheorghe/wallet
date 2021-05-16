import React, { FC, FormEvent, useEffect, useState } from 'react'
import { Spinner, Table, Alert } from 'react-bootstrap'
import TransactionItem from '../../components/transactionItem'
import Balance from '../../components/balance'
import { useFetchTransactionsAndTotal } from '../../hooks/useFetchTransactionsAndTotal'
import AddTransaction from '../../components/addTransaction'
import { useAddTransaction } from '../../hooks/useAddTransaction'

const TransactionList: FC<any> = () => {
  const {
    transactions,
	setTransactions,
	fetchTransactionsAndTotal,
	total,
	error,
	isLoading
  } = useFetchTransactionsAndTotal()
  const {
    addTransaction,
	isLoading: isAddTransactionLoading,
	error: addTransactionError
  } = useAddTransaction()
  const [value, setValue] = useState<number | undefined>(undefined)
  const onTransactionInputChange = (value: string) => {
    setValue(parseInt(value))
  }
  const onTransactionAddClick = (event: FormEvent) => {
    event.preventDefault()
	if (value) {
	  addTransaction(value).then(() => {
	    const newTransactions = [ ...transactions]
		newTransactions.push({ value })
	    setTransactions(newTransactions)
	  })
	}
  }
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTransactionsAndTotal()
	}, 5000)
	return () => {
      clearInterval(interval)
	}
  }, [])
  if (isLoading) {
    return <Spinner animation={'grow'} />
  }
  return (
    <>
	  {error ? <Alert variant="danger">{error.message}</Alert> : null}
	  <Balance balance={total} />
	  <Table>
		<thead>
		  <tr>
			<th>#</th>
			<th>Amount</th>
		  </tr>
		</thead>
		<tbody>
			{transactions.map((transaction, index) => {
			  return (
			    <tr>
				  <td>{index}</td>
				  <td>
					<TransactionItem
					  key={index}
					  value={transaction.value}
					/>
				  </td>
				</tr>
			  )
			})}
		</tbody>
	  </Table>
	  <AddTransaction
		value={value}
		onButtonClick={onTransactionAddClick}
		onInputChange={onTransactionInputChange}
		isLoading={isAddTransactionLoading}
		error={addTransactionError?.message || ''}
	  />
	</>
  )
}

export default TransactionList
