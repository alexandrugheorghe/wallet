import { Request, Response, Express } from 'express'
import * as cors from 'cors'
import * as express from 'express'
import * as mongoose from 'mongoose'
import config from './config'
import TransactionsServiceFactory from './server/services/transactions/transactions'
import TransactionGatewayFactory from './server/gateways/transactions'

const app: Express = express()
app.use(cors())
app.use(express.json())

const transactionsService = TransactionsServiceFactory({
  transactionGateway: TransactionGatewayFactory()
})

app.get('/api/health/ready', (request: Request, response: Response) => {
  response.sendStatus(200)
})

app.get('/api/transactions', (request: Request, response: Response) => {
  return Promise.all([
    transactionsService.getAllTransaction(),
    transactionsService.getTotal()
  ])
  .then(([transactions, total]) => {
    return response.status(200).send({
      transactions,
      total
    })
  })
  .catch(error => {
    return response.status(500).send(error.message)
  })
})

app.post('/api/transactions', (request: Request, response: Response) => {
  return transactionsService.createTransaction(request.body.value).then(() => {
    return response.sendStatus(200)
  })
  .catch(error => {
    return response.status(500).send(error.message)
  })
})

app.listen(config.port, () => {
  console.log(`Server listening at localhost:${config.port}.`)
  return mongoose.connect(
    config.mongodbUrl,
    {useNewUrlParser: true, useUnifiedTopology: true}
  ).then(() => {
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))
    db.once('open', function() {
      console.log('MongoDB connected.')
    });
  })
})
