import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import {hash} from "bcryptjs"

interface IUserRequest {
  name: string
  email: string
  password: string
  admin?: boolean
}

class CreateUserService {
  async execute({ name, email, admin, password }: IUserRequest) {
    const usersRepositoty = getCustomRepository(UsersRepositories)

    if (!email) {
      throw new Error("Email incorrect")
    }

    const passwordHash = await hash(password, 8)

    const userAlreadyExists = await usersRepositoty.findOne({ email })

    if (userAlreadyExists) {
      throw new Error("User already exists")
    }
    
    const user = usersRepositoty.create({
      name,
      email,
      admin,
      password: passwordHash
    })

    await usersRepositoty.save(user)
    return user

  }
}

export { CreateUserService }