import dotenv from 'dotenv'
dotenv.config()
const {
  PORT,
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env

export default {
  port: PORT,
  nodeEnv: NODE_ENV,
  postgresHost: POSTGRES_HOST,
  postgresDB: POSTGRES_DB,
  postgresUser: POSTGRES_USER,
  postgresPassword: POSTGRES_PASSWORD
}

//storeDevAdmin
//storeTestAdmin
