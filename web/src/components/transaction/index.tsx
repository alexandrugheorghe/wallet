import React, { FC } from 'react'
import { TransactionAmount, TransactionTotal } from './styled-components'
import { Props } from './types'

const Transaction: FC<Props> = props => {
	return (
	  <TransactionAmount>
		{props.number}
		<TransactionTotal>{props.total}</TransactionTotal>
	  </TransactionAmount>
	)
}

export default Transaction
