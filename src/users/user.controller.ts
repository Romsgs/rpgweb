import { UserService } from "./user.service";
import {
  deleteUserByIdDTO,
  getUserByEmailDTO,
  getUserByIdDTO,
  updateUserPasswordDTO,
} from "./userInterfaces";
const userService = new UserService();

export class UserController {
  getAllUsers = async () => {
    return await userService.getAllUsers();
  };

  getUserById = async (body: getUserByIdDTO) => {
    const { id } = body;
    return await userService.getUserById(id);
  };
  getUserByEmail = async (body: getUserByEmailDTO) => {
    const { email } = body;
    return await userService.getUserByEmail(email);
  };
  deleteUserById = async (id: string) => {
    return await userService.deleteUserById(id);
  };
  updateUserPassword = async (body: updateUserPasswordDTO) => {
    const { email, new_password } = body;
    return await userService.updateUserPassword(email, new_password);
  };
}
