import path from 'path'

import mongoose from 'mongoose'
import migrateMongo from 'migrate-mongo'

import { settings, logger } from '@fedomac/core'

export class DatabaseHelper {
  static #conn

  static #entities = new Map()

  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor() {}

  static registerSchema(entityName, schema) {
    this.#entities.set(entityName, { schema })
  }

  static getModel(entityName) {
    const entity = this.#entities.get(entityName)
    if (!entity) {
      throw new Error(`Entity ${entityName} is not registered`)
    }
    if (entity.model) {
      return entity.model
    }
    entity.model = this.#conn.model(entityName, entity.schema)
    return entity.model
  }

  static async #initMongoose(uri) {
    mongoose.connection.on('connecting', () => {
      logger.debug('Connecting to DB')
    })
    mongoose.connection.on('connected', () => {
      logger.debug('Connected to DB')
    })
    mongoose.connection.on('error', (err) => {
      logger.error('Failed to connect to DB on startup ', err)
    })
    mongoose.connection.on('disconnected', () => {
      logger.info('Disconnected from DB')
    })

    this.#conn = await mongoose
      .connect(uri, {
        connectTimeoutMS: 5000,
        bufferCommands: false, // Mongoose-specific buffering
        autoIndex: false,
      })
      .catch((error) => {
        logger.error('DB connection error', error)
        throw error
      })

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', this.#close).on('SIGTERM', this.#close)
  }

  static async #migrate(uri) {
    const migrationConfig = {
      mongodb: {
        url: uri,
        options: { useNewUrlParser: true, useUnifiedTopology: true },
      },
      migrationsDir: path.join(process.cwd(), '..', 'db', 'migrations'),
      changelogCollectionName: 'changelog',
      migrationFileExtension: '.js',
    }
    await migrateMongo.config.set(migrationConfig)
    const { db, client } = await migrateMongo.database.connect()
    const migrationStatus = await migrateMongo.status(db)
    logger.debug(migrationStatus, 'Migration status:')
    const remainingMigrationCount = migrationStatus.reduce(
      (count, record) => (record.appliedAt === 'PENDING' ? count + 1 : count),
      0
    )
    if (remainingMigrationCount) {
      logger.info('Start database migration')
      const changes = await migrateMongo.up(db, client)
      changes.forEach((fileName) => logger.info(`Migrated: ${fileName}`))
      logger.info('Finish database migration')
    }
    await client.close()
  }

  static async init() {
    const { host, port, username, password, name } = settings.database
    const uri =
      process.env.NODE_ENV === 'test'
        ? `mongodb+srv://${global.__MONGO_URI__}/${global.__MONGO_DB_NAME__}?retryWrites=true&w=majority`
        : `mongodb+srv://${username}:${password}@${host}/${name}?retryWrites=true&w=majority`
    await this.#migrate(uri)
    await this.#initMongoose(uri)
  }

  static async startTransaction() {
    const session = await this.#conn.startSession()
    session.startTransaction()
    return session
  }

  static async abortTransaction(transaction) {
    if (transaction.transaction.state !== 'TRANSACTION_ABORTED') {
      return transaction.abortTransaction()
    }
    return Promise.resolve()
  }

  static async commitTransaction(transaction) {
    return transaction.commitTransaction()
  }

  static endTransaction(transaction) {
    if (!transaction.hasEnded) {
      transaction.endSession()
    }
  }

  static #close() {
    mongoose.connection.close(() => {
      logger.info(
        'Mongoose default connection with DB is disconnected through app termination'
      )
      process.exit(0)
    })
  }

  static async isCollectionExisting(collectionName, db) {
    const collectionCursor = await db.listCollections()
    // eslint-disable-next-line no-await-in-loop
    while (await collectionCursor.hasNext()) {
      // eslint-disable-next-line no-await-in-loop
      const collection = await collectionCursor.next()
      if (collection.name === collectionName) {
        return true
      }
    }
    return false
  }
}
