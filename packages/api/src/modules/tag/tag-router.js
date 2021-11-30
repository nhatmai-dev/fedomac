import express from 'express'

import { tagController } from './tag-controller'
import { EndpointUtils } from '../../utils/endpoint-utils'

const tagRouter = express.Router()

/**
 * @openapi
 * tags:
 *   - name: tag
 *
 * paths:
 *   /tag:
 *     get:
 *       tags:
 *         - tag
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: query
 *           name: name
 *           schema:
 *             type: string
 *             description: tag name
 *             example: re
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: returns a list of tags
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     tag:
 *                       $ref: '#/components/schemas/Tag'
 *                     articleCount:
 *                       type: number
 *                       example: 21
 */
tagRouter.get('/', EndpointUtils.make(tagController.readList))

export { tagRouter }
