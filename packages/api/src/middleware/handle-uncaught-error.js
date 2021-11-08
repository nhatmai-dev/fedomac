import HttpStatus from 'http-status'
import Joi from 'joi'

import { logger } from '@fedomac/core'

const buildErrorResponseBody = (err) => ({
  error: {
    message: err.message,
    details: err.details,
  },
})

export default (err, req, res, next) => {
  if (err instanceof Joi.ValidationError) {
    return res.status(HttpStatus.BAD_REQUEST).json(buildErrorResponseBody(err))
  }
  if (err.isBoom) {
  }
  logger.error(err, 'Uncaught error:')
  return res.status(HttpStatus.BAD_REQUEST).json(buildErrorResponseBody(err))
}
