import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'
//validate user create request on route level by validate request
//validateRequest middleware recieved a zod schema
const validateRequest =
  (zodSchema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await zodSchema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
        cookies: req.cookies,
      })
      return next()
    } catch (error) {
      next(error)
    }
  }

export default validateRequest
