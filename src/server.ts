import mongoose from 'mongoose'
import app from './app'
import configEnv from './configEnv'
import { errorLogger, successLogger } from './shared/winstonLogger/logger'
import { Server } from 'http'
/*
src/server.ts e database connection takbe..
app.ts e express theke app start kora hobe..
 */

//handle uncaught exception
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
process.on('uncaughtException', error => {
  console.log('uncaughtException detected.....')
  errorLogger.error('uncaughtException is happend on server.ts', error)
  process.exit(1)
})

let server: Server
async function connectDB() {
  try {
    await mongoose.connect(configEnv.database_url as string)
    successLogger.info('DB connect successfully!')
    server = app.listen(configEnv.port, () => {
      successLogger.info(`Application listen on port ${configEnv.port} console`)
    })
  } catch (err) {
    errorLogger.error('Could not connect DB', err)
  }
  process.on('unhandledRejection', error => {
    console.log('unhandledRejection dedected, we are closing server')
    errorLogger.error(error)

    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
connectDB()
// handle sigterm
process.on('SIGTERM', () => {
  successLogger.info('SIGTERM is recieved!')
  if (server) {
    server.close()
    // process.exit(1)
  }
})
//uncaught exception
// console.log(x)
