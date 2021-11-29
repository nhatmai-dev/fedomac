import mongoose from 'mongoose'

import { DatabaseHelper, consts } from '@fedomac/db'
import lodash from 'lodash'

class FileRepository {
  #fileModel

  get #model() {
    if (!this.#fileModel) {
      this.#fileModel = DatabaseHelper.getModel(consts.entities.FILE)
    }
    return this.#fileModel
  }

  async save(data, transaction) {
    return this.#model
      .create([data], { session: transaction })
      .then((results) =>
        lodash.omit(results[0].toObject(), ['isDeleted', '__v'])
      )
  }
}

export const fileRepository = new FileRepository()
