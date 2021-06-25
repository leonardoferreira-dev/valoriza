
import { Request, Response } from "express"
import { AuthenticateUserService } from "../services/AuthenticateUserService"

class CreateTagController {

  async handle(request: Request, response: Response) {
    const { email, password } = request.body
    const authenticateService = new AuthenticateUserService();
    const tag = await authenticateService.exexute({ email, password })
    return response.json(tag)
  }
}

export { CreateTagController }