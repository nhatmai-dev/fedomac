import httpStatus from 'http-status'

import { tagService } from './tag-service'

class TagController {
  #tagService

  /**
   * constructor
   * @param {TagService} tagService
   */
  constructor(tagService) {
    this.#tagService = tagService
    this.readList = this.readList.bind(this)
  }

  async readList(req, res) {
    const data = await this.#tagService.readList(req.query.name)
    return res.send({ data })
  }
}

export const tagController = new TagController(tagService)
