import Boom from '@hapi/boom'

import { consts } from '@fedomac/core'
import { DatabaseHelper } from '@fedomac/db'

import { tagRepository } from './tag-repository'

export class TagService {
  #tagRepository

  /**
   * constructor
   * @param {TagRepository} tagRepository
   */
  constructor(tagRepository) {
    this.#tagRepository = tagRepository
    this.read = this.read.bind(this)
    this.readList = this.readList.bind(this)
    this.create = this.create.bind(this)
  }

  async read(id) {
    const tag = await this.#tagRepository.readById(id)
    if (!tag) {
      throw Boom.notFound(consts.COMMON_MESSAGES.NOT_FOUND('tag'))
    }
    return tag
  }

  async readList(tagName) {
    const tags = await this.#tagRepository.readListAndCount(tagName)
    return tags
  }

  async create(data, dbTx) {
    const transaction = dbTx || (await DatabaseHelper.startTransaction())

    let tag
    try {
      tag = await this.#tagRepository.save(data, dbTx || transaction)
    } catch (error) {
      await DatabaseHelper.abortTransaction(dbTx || transaction)
      DatabaseHelper.endTransaction(dbTx || transaction)
      throw error
    }

    if (!dbTx) {
      await DatabaseHelper.commitTransaction(transaction)
      DatabaseHelper.endTransaction(transaction)
    }
    return tag
  }
}
export const tagService = new TagService(tagRepository)
