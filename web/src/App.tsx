import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TransactionList from './containers/transactionList'

function App() {
  return (
    <Container>
      <Row>
        <Col/>
        <Col>
          <TransactionList />
        </Col>
        <Col/>
      </Row>
    </Container>
  )
}

export default App
