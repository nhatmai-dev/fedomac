import path from 'path'
import Joi from 'joi'

const supportedFileFormatRegex = [/\.jp(e|)g$/i, /\.png$/i, /\.gif$/i]

export const uploadArticleImage = {
  file: Joi.object({
    fieldname: Joi.string(),
    originalname: Joi.string()
      .custom((value, helpers) => {
        const extension = path.extname(value)
        // eslint-disable-next-line no-restricted-syntax
        for (const regex of supportedFileFormatRegex) {
          if (regex.test(extension)) {
            return value
          }
        }

        return helpers.error('any.invalid')
      }, 'Custom validation')
      .message('Unsupported file format.'),
    encoding: Joi.string(),
    mimetype: Joi.string(),
    buffer: Joi.binary(),
    size: Joi.number(),
  }),
}
