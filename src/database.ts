import config from './config'
import {Pool} from 'pg'

const dbClient = new Pool({
  host: config.postgresHost,
  database: config.postgresDB,
  user: config.postgresUser,
  password: config.postgresPassword,
})

export default dbClient
