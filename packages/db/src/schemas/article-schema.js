import mongoose from 'mongoose'
import lodash from 'lodash'

import baseSchema from './base-schema'

mongoose.Promise = global.Promise

const commentSchema = new mongoose.Schema({
  commenterName: { type: String, default: () => 'Anonymous' },
  body: { type: String, required: true },
  applause: { type: Number, default: () => 0 },
})
commentSchema.add({
  replies: [commentSchema],
})

const articleSchema = new mongoose.Schema(
  lodash.merge({}, baseSchema, {
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Tag',
      },
    ],
    applause: { type: Number, default: () => 0 },
  })
)
articleSchema.add({
  comments: [commentSchema],
})

export default articleSchema
