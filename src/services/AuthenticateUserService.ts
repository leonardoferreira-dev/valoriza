import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"



interface IRequest {
    email: string
    password: string
}

class AuthenticateUserService {
    async execute({email, password}: IRequest) {
        const usersRepositoty = getCustomRepository(UsersRepositories)

        const user = await usersRepositoty.findOne({email})

        if(!user) {
            throw new Error("Email/Password incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("Email/Password incorrect")
        }

        const token = sign(
        {
            email: user.email
        },
        "29691813de923aa290cde8bd2ba88767",
        {
            subject: user.id,
            expiresIn: "1d"
        })

    }
}

export {AuthenticateUserService}