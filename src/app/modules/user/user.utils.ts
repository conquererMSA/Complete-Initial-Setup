import { User } from './user.model'

const lastUserDB = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUser?.id
}

const generateUserId = async () => {
  //              last user id from db    00000
  const currentId = (await lastUserDB()) || (0).toString().padStart(5, '0')
  const incrementalId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  return incrementalId
}
export default generateUserId
