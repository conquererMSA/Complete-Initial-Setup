import { RequestHandler } from 'express'
import { UserService } from './user.service'

// controller controll the request and response system
const createUserController: RequestHandler = async (req, res, next) => {
  const { user } = req.body
  try {
    const result = await UserService.createUserService(user)
    res
      .status(200)
      .json({ success: true, message: 'created user', data: result })
  } catch (error) {
    // res.status(400).json({ success: false, error: 'could not create user' })
    next(error)
  }
}

export const UserController = { createUserController }
