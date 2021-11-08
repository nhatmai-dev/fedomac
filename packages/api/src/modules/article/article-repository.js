import lodash from 'lodash'

import { DatabaseHelper, consts } from '@fedomac/db'

class ArticleRepository {
  #articleModel

  get #model() {
    if (!this.#articleModel) {
      this.#articleModel = DatabaseHelper.getModel(consts.entities.ARTICLE)
    }
    return this.#articleModel
  }

  async save(data, transaction) {
    return this.#model
      .create([data], { session: transaction })
      .then((results) => results[0])
      .then(async (result) => result.populate('tags'))
      .then((result) => result.toObject())
      .then((result) => ({
        ...result,
        tags: result.tags.map((tag) =>
          lodash.omit(tag, ['createdAt', 'isDeleted', '__v'])
        ),
      }))
      .then((result) => lodash.omit(result, ['isDeleted', '__v']))
  }
}

export const articleRepository = new ArticleRepository()
