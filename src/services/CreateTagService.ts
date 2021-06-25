import { getCustomRepository } from "typeorm"

import { TagsRepositories } from "../repositories/TagsRepositories"


interface IRequest {
  name: string
}


class CreateTagService {
  async exexute({ name }: IRequest) {
    const tagsRepositories = getCustomRepository(TagsRepositories)

    if (!name) {
      throw new Error("Incorrect name!");
    }

    const tagAlreadyExists = await tagsRepositories.findOne({ name })

    if (tagAlreadyExists) {
      throw new Error("Tag already exists!");
    }

    const tag = tagsRepositories.create({
      name
    })

    await tagsRepositories.save(tag)

    return tag

  }
}

export { CreateTagService }