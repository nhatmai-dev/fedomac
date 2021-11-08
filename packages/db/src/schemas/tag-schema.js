import mongoose from 'mongoose'
import lodash from 'lodash'

import baseSchema from './base-schema'

mongoose.Promise = global.Promise

export default new mongoose.Schema(
  lodash.merge({}, baseSchema, {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    color: {
      type: String,
      validator: [(value) => /^#[0-9a-f]{6}$/i.test(value), 'Invalid color'],
      required: true,
    },
  })
)
