import dotenv from 'dotenv'
//import config from './config'
import { Pool } from 'pg'

dotenv.config()

//getting environment variables from .env
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env


const dbClient = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD
})

export default dbClient