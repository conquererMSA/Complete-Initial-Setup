import configEnv from '../../../configEnv'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import generateUserId from './user.utils'

const createUserService = async (user: IUser): Promise<IUser | null> => {
  const lastId = await generateUserId()
  user.id = lastId
  if (!user.password) {
    user.password = configEnv.password as string
  }
  //create user to db
  const createdUser = await User.create(user)
  if (!createdUser) {
    new ApiError(500, 'Failed to create new user')
  }
  return createdUser
}
export const UserService = {
  createUserService,
}
