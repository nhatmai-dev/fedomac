import express from 'express'
import swaggerUI from 'swagger-ui-express'

import { articleRouter } from './modules/article/article-router'
import swaggerDocs from './docs/swagger-config'

const routerMap = [['/article', articleRouter]]

const router = express.Router()
routerMap.forEach(([contextPath, subRouter]) => {
  router.use(`/api${contextPath}`, subRouter)
})

router.use('/docs', swaggerUI.serve)
router.get('/docs', swaggerUI.setup(swaggerDocs))

export default router
