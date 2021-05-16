import React from 'react'
import './App.css'
import TransactionList from './containers/transactionList'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Your wallet App :)
        </p>
        <TransactionList />
      </header>
    </div>
  )
}

export default App
