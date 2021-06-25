

import {UsersRepositories} from "../repositories/UsersRepositories"
import { getCustomRepository } from "typeorm"


interface IAuthenticateRequest {
  email: string
  password: string
}

class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest){
    // verificar se o email exite
    if(!email) {
      throw new Error("");
    }

    const usersRepositoty = getCustomRepository(UsersRepositories)

    const user = await usersRepositoty.findOne({email})

    if(!user) {
      throw new Error("Email/password incorrect");
    }


    // verificar se a senha está correta


    // gerar token

  }
}

export {AuthenticateUserService}