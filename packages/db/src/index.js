import { DatabaseHelper } from './utils'
import schemas from './schemas'
import consts from './consts'

DatabaseHelper.registerSchema(consts.entities.ARTICLE, schemas.articleSchema)
DatabaseHelper.registerSchema(consts.entities.TAG, schemas.tagSchema)
DatabaseHelper.registerSchema(consts.entities.FILE, schemas.fileSchema)

export { DatabaseHelper, consts }
