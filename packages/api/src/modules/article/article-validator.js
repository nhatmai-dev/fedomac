import Joi from 'joi'
import joiObjectId from 'joi-objectid'

Joi.objectId = joiObjectId(Joi)

const newTagSchema = Joi.object({
  name: Joi.string().required(),
  color: Joi.string()
    .pattern(/^#[0-9a-f]{6}$/)
    .required(),
}).required()

const existingTagSchema = Joi.object({
  id: Joi.objectId().required(),
}).required()

export const post = {
  body: Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(
      Joi.alternatives().try(newTagSchema, existingTagSchema)
    ),
  }),
}
