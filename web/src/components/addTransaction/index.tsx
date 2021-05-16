import React, { FC } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Props } from './types'

const AddTransaction: FC<Props> = props => {
  const { value, isLoading, onButtonClick, onInputChange, error } = props

  return (
    <Form>
      {error ? <Alert variant="danger">{error}</Alert> : null}
      <Form.Group controlId="forForAddingTransactions">
        <Form.Label>Transaction value</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter transaction value"
          value={value}
          onChange={event => onInputChange(event.target.value)}
        />
        <Form.Text className="text-muted">
          Don't go below your balance.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={isLoading} onClick={onButtonClick}>
        Make transaction
      </Button>
    </Form>
  )
}

export default AddTransaction
