import React, { FC } from 'react'
import { Props } from './types'
import { BalanceTotal } from './styled-components'

const Balance: FC<Props> = props => {
  return (
	<BalanceTotal>
	  {props.balance}
	</BalanceTotal>
  )
}

export default Balance
