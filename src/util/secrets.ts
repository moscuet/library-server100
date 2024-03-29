import dotenv from 'dotenv'
import fs from 'fs'

import logger from './logger'

if (fs.existsSync('.env')) {
  console.log('true')
  logger.debug('Using .env file to supply config environment variables')
  dotenv.config({ path: '.env' })
} else {
  console.log('false')
  logger.debug('Using .env.example file to supply config environment variables')
  dotenv.config({ path: '.env.example' })
}

export const ENVIRONMENT = process.env.NODE_ENV
console.log('environment:', ENVIRONMENT)
const prod = ENVIRONMENT === 'production'

export const JWT_SECRET = process.env['JWT_SECRET'] as string
export const MONGODB_URI = (
  prod ? process.env['MONGODB_URI'] : process.env['MONGODB_URI']
) as string

if (!JWT_SECRET) {
  logger.error('No client secret. Set JWT_SECRET environment variable.')
  process.exit(1)
}

if (!MONGODB_URI) {
  if (prod) {
    logger.error(
      'No mongo connection string. Set MONGODB_URI environment variable.'
    )
  } else {
    logger.error(
      'No mongo connection string. Set MONGODB_URI_LOCAL environment variable.'
    )
  }
  process.exit(1)
}
