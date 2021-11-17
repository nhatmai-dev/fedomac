import Boom from '@hapi/boom'
import lodash from 'lodash'

import { consts } from '@fedomac/core'
import { DatabaseHelper } from '@fedomac/db'

import { tagRepository } from './tag-repository'

export class TagService {
  /**
   * constructor
   * @param {TagRepository} tagRepository
   */
  constructor(tagRepository) {
    this.tagRepository = tagRepository
    this.read = this.read.bind(this)
    this.create = this.create.bind(this)
  }

  async read(id) {
    const tag = await this.tagRepository.readById(id)
    if (!tag) {
      throw Boom.notFound(consts.COMMON_MESSAGES.NOT_FOUND('tag'))
    }
    return tag
  }

  async create(data, dbTx) {
    const transaction = dbTx || await DatabaseHelper.startTransaction()

    let tag
    try {
      tag = await this.tagRepository.save(data, dbTx || transaction)
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
