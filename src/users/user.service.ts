import { UserRepository } from '../users/users.repository'
import { User } from '@prisma/client'

const userRepository = new UserRepository()

export class UserService {
  getAllUsers = async ()=> {
    return await userRepository.get_all_users()
  }
  getUserById = async (id: string)=> {
    return await userRepository.get_user_by_id(id)
  }
  getUserByEmail = async (email: string)=> {
    return await userRepository.get_user_by_email(email)
  }
  deleteUserById = async (id: string)=> {
    return await userRepository.delete_user_by_id(id)
  }
  updateUserPassword = async (email: string, new_password: string) => {
    return await userRepository.set_user_password(email, new_password)
  }
}