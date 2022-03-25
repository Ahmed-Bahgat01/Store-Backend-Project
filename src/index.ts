import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import routes from './routes'
import errorMiddleware from './middlewares/error.middleware'
import cors from 'cors'

const app: express.Application = express()
// const address: string = '0.0.0.0:3000'
// const PORT = process.env.PORT || 3000

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

// app.listen(PORT, function() {
//   console.log(`starting app on: ${address}`)
// })

export default app
