import { ErrorRequestHandler } from 'express'
import configEnv from '../configEnv'
import { IGenericErrorMessage } from '../interfaces/error'
import handleValidationError from '../errors/handleValidationError'
import ApiError from '../errors/ApiError'
import { errorLogger } from '../shared/winstonLogger/logger'
import handleZodError from '../errors/handleZodError'
import { ZodError } from 'zod'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  configEnv.env === 'development'
    ? console.log(`error on GLERHAN:`, err)
    : errorLogger.error('GLERHAN', err)

  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  //make error simplified
  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof ApiError) {
    // eslint-disable-next-line no-unused-expressions
    ;(statusCode = err?.statusCode),
      (message = err?.message),
      (errorMessages = err?.message
        ? [
            {
              path: '',
              message: err?.message,
            },
          ]
        : [])
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: configEnv.env !== 'production' ? err?.stack : undefined,
  })

  next()
}
export default globalErrorHandler
