import express from 'express'

import { EndpointUtils } from '../../utils/endpoint-utils'
import { singleFileUpload, validate } from '../../middleware'
import { uploadController } from './upload-controller'
import * as uploadValidator from './upload-validator'

const uploadRouter = express.Router()

/**
 * @openapi
 * tags:
 *   - name: upload
 * paths:
 *   /upload/article/image:
 *     post:
 *       summary: uploads an image for an article
 *       tags:
 *         - upload
 *       consumes:
 *         - multipart/form-data
 *       produces:
 *         - application/json
 *       responses:
 *         201:
 *           description: Image uploaded
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   url:
 *                     type: string
 *                 example:
 *                   url: https://fedomac-dev.s3.ap-southeast-1.amazonaws.com/articles/result__20211127183019038.png
 */
uploadRouter.post(
  '/article/image',
  singleFileUpload,
  validate(uploadValidator.uploadArticleImage),
  EndpointUtils.make(uploadController.uploadArticleImage)
)

export { uploadRouter }
