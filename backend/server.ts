import { Request, Response, Express } from 'express'
import * as express from 'express'
import config from './config'

const app: Express = express()

app.get('/health/ready', (request: Request, response: Response) => {
  response.sendStatus(200)
})

app.listen(config.port, () => {
  console.log(`Server listening at localhost:${config.port}.`)
})
