import express from 'express'
import { UserController } from './user.controller'
import { UserValidation } from './user.Validation'
import validateRequest from '../../../middlewares/validateRequest'

const userRouter = express.Router()

userRouter.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUserController,
)

export const UserRoutes = userRouter
