import dotenv from 'dotenv'
dotenv.config()
const {
  PORT,
  NODE_ENV,
  POSTGRES_HOST,
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
  // postgresDB: POSTGRES_DB,
  // postgresTestDB: POSTGRES_TEST_DB,
  postgresDB: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
  postgresUser: POSTGRES_USER,
  postgresTestUser: POSTGRES_TEST_USER,
  postgresPassword: POSTGRES_PASSWORD,
  postgresTestPassword: POSTGRES_TEST_PASSWORD,
  password_pepper: PASSWORD_PEPPER,
  saltRounds: SALT_ROUNDS,
  jwtSecret: JWT_SECRET,
}

// storeDevAdmin
// storeTestAdmin
