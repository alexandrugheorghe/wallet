export class InvalidTransactionValueError extends Error {
  constructor(value: number) {
	super(`Invalid transaction value: ${value}`)
  }
}

export class InsufficientBalanceError extends Error {
  constructor(value: number) {
	super(`Insufficient balance for transaction of value: ${value}`)
  }
}
