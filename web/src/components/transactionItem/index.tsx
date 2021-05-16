import React, { FC } from 'react'
import { TransactionAmount } from './styled-components'
import { Props } from './types'

const Transaction: FC<Props> = props => {
	return (
	  <TransactionAmount>
		{props.value}
	  </TransactionAmount>
	)
}

export default Transaction
