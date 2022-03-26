import config from './config'
import {Pool} from 'pg'

const dbClient = new Pool({
  host: config.postgresHost,
  database: config.postgresDB,
  user: config.postgresUser,
  password: config.postgresPassword,
  port: parseInt(config.postgresPort as string, 10),
})

dbClient.on('error', (error) => {
  console.error(`Error: ${error.message}`)
})

export default dbClient
