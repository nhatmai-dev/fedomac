import Boom from '@hapi/boom'

import { DatabaseHelper } from '@fedomac/db'

import { fileRepository } from './file-repository'

export class FileService {
  #fileRepository

  /**
   * constructor
   * @param {FileRepository} fileRepository
   */
  constructor(fileRepository) {
    this.#fileRepository = fileRepository
    this.create = this.create.bind(this)
  }

  async create(url, dbTx) {
    const transaction = dbTx || (await DatabaseHelper.startTransaction())

    let file
    try {
      file = await this.#fileRepository.save({ url }, dbTx || transaction)
    } catch (error) {
      await DatabaseHelper.abortTransaction(dbTx || transaction)
      DatabaseHelper.endTransaction(dbTx || transaction)
      throw error
    }

    if (!dbTx) {
      await DatabaseHelper.commitTransaction(transaction)
      DatabaseHelper.endTransaction(transaction)
    }
    return file
  }
}
export const fileService = new FileService(fileRepository)
