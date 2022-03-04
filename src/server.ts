import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import routes from './routes'

const app: express.Application = express()
const address: string = '0.0.0.0:3000'
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use('/api', routes)

app.get('/', function(req: Request, res: Response) {
  res.send('Hello World!')
})

app.listen(PORT, function() {
  console.log(`starting app on: ${address}`)
})
