import express from 'express'
import PinoHttp from 'pino-http'
import helmet from 'helmet'

import { settings, logger } from '@fedomac/core'
import { DatabaseHelper } from '@fedomac/db'

import router from './router'
import handleUncaughtError from './middleware/handle-uncaught-error'

// eslint-disable-next-line import/newline-after-import
;(async () => {
  await DatabaseHelper.init()
  const app = express()

  // const pinoHttp = PinoHttp({ logger })
  // app.use(pinoHttp)
  app.use(helmet())
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(router)
  app.get('/', (req, res) => res.send('Ok'))
  app.use(handleUncaughtError)
  const { port } = settings.api
  app.listen(port, () => {
    logger.info(`Running on port ${port}`)
  })
})()
