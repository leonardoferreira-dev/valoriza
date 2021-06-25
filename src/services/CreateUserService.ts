import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest {
  name: string
  email: string
  admin?: boolean
}

class CreateUserService {
  async execute({ name, email, admin }: IUserRequest) {
    const usersRepositoty = getCustomRepository(UsersRepositories)

    if (!email) {
      throw new Error("Email incorrect")
    }

    const userAlreadyExists = await usersRepositoty.findOne({ email })

    if (userAlreadyExists) {
      throw new Error("User already exists")
    }

    const user = usersRepositoty.create({
      name,
      email,
      admin
    })

    await usersRepositoty.save(user)
    return user

  }
}

export { CreateUserService }