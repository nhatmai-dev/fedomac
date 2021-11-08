import mongoose from 'mongoose'

import { DatabaseHelper, consts } from '@fedomac/db'
import lodash from 'lodash'

class TagRepository {
  #tagModel

  get #model() {
    if (!this.#tagModel) {
      this.#tagModel = DatabaseHelper.getModel(consts.entities.TAG)
    }
    return this.#tagModel
  }

  async readById(id) {
    return this.#model
      .findOne(
        {
          _id: mongoose.Types.ObjectId(id),
          isDeleted: false,
        },
        {
          isDeleted: 0,
          __v: 0,
        }
      )
      .lean()
  }

  async save(data, transaction) {
    return this.#model
      .create([data], { session: transaction })
      .then((results) =>
        lodash.omit(results[0].toObject(), ['isDeleted', '__v'])
      )
  }
}

export const tagRepository = new TagRepository()
