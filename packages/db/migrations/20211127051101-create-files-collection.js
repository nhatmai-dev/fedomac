const { DatabaseHelper } = require('esm')(module)('../src')

const filesCollectionName = 'files'

module.exports = {
  async up(db, client) {
    await DatabaseHelper.isCollectionExisting(filesCollectionName, db).then(
      (isExisting) => {
        db.createCollection(filesCollectionName)
        db.collection(filesCollectionName).createIndex('url')
      }
    )
  },

  async down(db, client) {
    await DatabaseHelper.isCollectionExisting(filesCollectionName, db).then(
      (isExisting) => db.collection(filesCollectionName).drop()
    )
  },
}
