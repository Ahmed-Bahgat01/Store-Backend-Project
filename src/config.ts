import dotenv from 'dotenv'
dotenv.config()
const {
  PORT,
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_TEST_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_PASSWORD,
  PASSWORD_PEPPER,
  SALT_ROUNDS,
  JWT_SECRET,
} = process.env

export default {
  port: PORT,
  nodeEnv: NODE_ENV,
  postgresHost: POSTGRES_HOST,
  postgresPort: POSTGRES_PORT,
  postgresDB: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
  postgresUser: NODE_ENV === 'dev' ? POSTGRES_USER : POSTGRES_TEST_USER,
  postgresPassword: NODE_ENV ==='dev'? POSTGRES_PASSWORD:POSTGRES_TEST_PASSWORD,
  password_pepper: PASSWORD_PEPPER,
  saltRounds: SALT_ROUNDS,
  jwtSecret: JWT_SECRET,
}
