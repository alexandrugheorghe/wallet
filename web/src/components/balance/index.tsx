import React, { FC } from 'react'
import { Props } from './types'
import { BalanceTotal } from './styled-components'

const Balance: FC<Props> = props => {
  return (
	<BalanceTotal>
	  Total: {props.balance}
	</BalanceTotal>
  )
}

export default Balance
