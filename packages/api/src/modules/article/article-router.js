import express from 'express'

import * as articleValidator from './article-validator'
import { articleController } from './article-controller'
import { validate } from '../../middleware/validate'
import { EndpointUtils } from '../../utils/endpoint-utils'

const articleRouter = express.Router()

/**
 * @openapi
 * tags:
 *   - name: article
 *
 * components:
 *   schemas:
 *     NewTag:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         color:
 *           type: string
 *       required:
 *         - name
 *         - color
 *       example:
 *         name: react
 *         color: '#03adfc'
 *     ExistingTag:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *       required:
 *         - id
 *       example:
 *         id: 61785763859593fa1877ee69
 *     Tag:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         color:
 *           type: string
 *       example:
 *         id: 61785763859593fa1877ee69
 *         name: react
 *         color: '#03adfc'
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         body:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Tag'
 *         createdAt:
 *           type: string
 *       example:
 *         id: 617646db1ba7483d1c0d8129
 *         title: My awesome article
 *         body: <h1>Content<h1>
 *         tags: [{id: 61784eefb54bb5a984ad104e, name: react, color: '#03adfc'}]
 *         createdAt: 2021-10-25T04:35:17.514Z
 */

/**
 * @openapi
 * paths:
 *   /article:
 *     post:
 *       summary: creates an article
 *       tags:
 *         - article
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: article
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   anyOf:
 *                     - $ref: '#/components/schemas/NewTag'
 *                     - $ref: '#/components/schemas/ExistingTag'
 *             required:
 *               - title
 *               - body
 *               - tags
 *       produces:
 *         - application/json
 *       responses:
 *         201:
 *           description: Article created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Article'
 */
articleRouter.post(
  '/',
  validate(articleValidator.post),
  EndpointUtils.make(articleController.post)
)

articleRouter.get(
  '/:id',
  validate(articleValidator.get),
  EndpointUtils.make(articleController.get)
)

export { articleRouter }
