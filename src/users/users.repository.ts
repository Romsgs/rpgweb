import { PrismaClient, User } from '@prisma/client'
import * as argon from 'argon2'
const prisma = new PrismaClient()

export class UserRepository {

    create = async (email: string, name: string, password: string) => {
        const hashed_password = await argon.hash(password)
        return await prisma.user.create({ data: { name, email, password: hashed_password } })

    }
    get_all_users = async (): Promise<User[]> => {
        return await prisma.user.findMany()
    }
    get_users_by_id = async (id: string): Promise<User | null> => {
        return await prisma.user.findUnique({ where: { id } })
    }
    get_users_by_email = async (email: string): Promise<User | null> => {
        return await prisma.user.findUnique({ where: { email } })
    }
    delete_user_by_id = async (id: string): Promise<User | null> => {
        return await prisma.user.delete({ where: { id } })
    }
    set_user_password = async (email: string, new_password: string): Promise<User | null> => {
        const hashed_password = await argon.hash(new_password)
        return await prisma.user.update({ where: { email }, data: { password: hashed_password } })
    }
    test_password = async (email: string, password: string): Promise<boolean> => {
        const user = await this.get_users_by_email(email)
        if (!user) {
            throw new Error('User not found')
        }
        return await argon.verify(user.password, password)
    }
}