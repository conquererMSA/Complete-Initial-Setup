import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../interfaces/error'
import IGenericErrorResponse from '../interfaces/common'

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(el => {
    return {
      path: el?.path as string, // Use type assertion here
      message: el?.message as string, // Use type assertion here
    }
  })
  const statusCode = 500
  return {
    statusCode,
    message: 'Mongoose Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
