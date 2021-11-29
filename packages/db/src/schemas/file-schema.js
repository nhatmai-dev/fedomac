import mongoose from 'mongoose'
import lodash from 'lodash'

import baseSchema from './base-schema'

mongoose.Promise = global.Promise

export default new mongoose.Schema(
  lodash.merge({}, baseSchema, {
    url: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    isInUse: {
      type: Boolean,
      required: true,
      default: () => false,
    },
  })
)
