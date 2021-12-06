import mongoose from 'mongoose'

import { DatabaseHelper, consts } from '@fedomac/db'
import lodash from 'lodash'

class TagRepository {
  #tagModel
  #articleModel

  get #getTagModel() {
    if (!this.#tagModel) {
      this.#tagModel = DatabaseHelper.getModel(consts.entities.TAG)
    }
    return this.#tagModel
  }

  get #getArticleModel() {
    if (!this.#articleModel) {
      this.#articleModel = DatabaseHelper.getModel(consts.entities.ARTICLE)
    }
    return this.#articleModel
  }

  async readById(id) {
    return this.#getTagModel
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

  async readListAndCount(tagName) {
    const pipeline = [
      { $match: { isDeleted: false } },
      {
        $project: {
          _id: 1,
          tags: 1,
        },
      },
      {
        $unwind: '$tags',
      },
      {
        $group: {
          _id: '$tags',
          articleCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'tags',
          localField: '_id',
          foreignField: '_id',
          as: 'tag',
        },
      },
      {
        $unwind: '$tag',
      },
      {
        $match: { 'tag.isDeleted': false },
      },
      {
        $project: {
          _id: 0,
          tag: {
            _id: 1,
            name: 1,
            color: 1,
          },
          articleCount: 1,
        },
      },
    ]
    if (tagName) {
      pipeline.splice(5, 0, {
        $match: {
          tag: {
            $elemMatch: {
              name: {
                $regex: `.*${tagName}.*`,
                $options: 'i',
              },
            },
          },
        },
      })
    }
    return this.#getArticleModel.aggregate(pipeline)
  }

  async save(data, transaction) {
    return this.#tagModel
      .create([data], { session: transaction })
      .then((results) =>
        lodash.omit(results[0].toObject(), ['isDeleted', '__v'])
      )
  }
}

export const tagRepository = new TagRepository()
