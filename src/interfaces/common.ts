import { IGenericErrorMessage } from './error'

type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}

export default IGenericErrorResponse
