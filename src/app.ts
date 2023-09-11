import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './middlewares/globalErrorHandlers'
import { UserRoutes } from './app/modules/user/user.routes'
// import ApiError from './errors/ApiError'

const app: Application = express()
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// console.log(app.get('env'))
// console.log(process.env)
// Application Routes
app.use('/api/v1/users', UserRoutes)

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.get('/api/v1', async (req: Request, res: Response, next: NextFunction) => {
  // res.json({ status: 200, message: 'App on home route' })
  // throw new ApiError(400, 'New error message from ApiError on app.ts from home route')
  // next('next error message')
  throw new Error('new Error from home route')

  // unhadled promise rejection
  // Promise.reject(new Error('Unhadled promise rejection!'))
})

// global error handler
app.use(globalErrorHandler)
export default app
