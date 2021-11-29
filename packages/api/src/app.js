import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { settings, logger } from '@fedomac/core'
import { DatabaseHelper } from '@fedomac/db'

import router from './router'
import { handleUncaughtError } from './middleware'

// eslint-disable-next-line import/newline-after-import
;(async () => {
  await DatabaseHelper.init()
  const app = express()

  app.use(helmet())
  app.use(cors())
  app.use(express.json({ limit: '3mb' }))
  app.use(express.urlencoded({ limit: '3mb', extended: false }))
  app.use(router)
  app.get('/', (req, res) => res.send('Ok'))
  app.use(handleUncaughtError)

  const { port } = settings.api
  app.listen(port, () => {
    logger.info(`Running on port ${port}`)
  })
})()
