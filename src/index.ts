import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import routes from './routes'
import errorMiddleware from './middlewares/error.middleware'
import cors from 'cors'

const app: express.Application = express()

// cors options for cors middleware
const corsOptions = {
  origin: 'http://someotherdomain.com',
  optionsSuccessStatus: 200,
}
// using cors middleware 4 all the app
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use('/api', routes)
app.use(errorMiddleware)

app.get('/', function(req: Request, res: Response) {
  res.send('Hello World!')
})

export default app
