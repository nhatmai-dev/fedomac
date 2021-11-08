import lodash from 'lodash'

import { DatabaseHelper } from '@fedomac/db'

import { articleRepository } from './article-repository'
import { tagService } from '../tag/tag-service'

export class ArticleService {
  /**
   * constructor
   * @param {ArticleRepository} articleRepository
   * @param {TagService} tagRepository
   */
  constructor(articleRepository, tagService) {
    this.articleRepository = articleRepository
    this.tagService = tagService
    this.create = this.create.bind(this)
  }

  async create(data, dbTx) {
    const transaction = dbTx || (await DatabaseHelper.startTransaction())

    let article
    try {
      const tags = await Promise.all(
        lodash.map(data.tags || [], async (tag) => {
          if (tag.id) {
            return this.tagService.read(tag.id).then((result) => result._id)
          }
          return this.tagService
            .create(tag, transaction)
            .then((result) => result._id)
        })
      )
      article = await this.articleRepository.save(
        lodash.merge({}, data, { tags }),
        transaction
      )
    } catch (error) {
      await DatabaseHelper.abortTransaction(dbTx || transaction)
      DatabaseHelper.endTransaction(dbTx || transaction)
      throw error
    }

    if (!dbTx) {
      await DatabaseHelper.commitTransaction(transaction)
      DatabaseHelper.endTransaction(transaction)
    }
    return article
  }
}

export const articleService = new ArticleService(articleRepository, tagService)
