// import dotenv from 'dotenv'
import config from './config'
import {Pool} from 'pg'

// dotenv.config()

// getting environment variables from .env
// const {
//   POSTGRES_HOST,
//   POSTGRES_DB,
//   POSTGRES_USER,
//   POSTGRES_PASSWORD,
// } = process.env


const dbClient = new Pool({
  host: config.postgresHost,
  database: config.postgresDB,
  user: config.postgresUser,
  password: config.postgresPassword,
})

export default dbClient
