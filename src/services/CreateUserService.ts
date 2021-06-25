import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash} from "bcryptjs"

interface IUserRequest {
  name: string
  password: string
  email: string
  admin?: boolean
}

class CreateUserService {
  async execute({ name,password, email, admin }: IUserRequest) {
    const usersRepositoty = getCustomRepository(UsersRepositories)

    if (!email) {
      throw new Error("Email incorrect")
    }

    const userAlreadyExists = await usersRepositoty.findOne({ email })

    if (userAlreadyExists) {
      throw new Error("User already exists")
    }

    const passwordHash = await hash(password, 8)

    const user = usersRepositoty.create({
      name,
      password: passwordHash,
      email,
      admin
    })

    await usersRepositoty.save(user)
    return user

  }
}

export { CreateUserService }