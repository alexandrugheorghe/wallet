import * as express from 'express'
import config from './config'

const app: express.Express = express()

app.get('/health/ready', (request, response) => {
  response.sendStatus(200)
})

app.listen(config.port, () => {
  console.log(`Server listening at ${config.port}.`)
})
