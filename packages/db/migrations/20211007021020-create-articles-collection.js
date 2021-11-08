const { DatabaseHelper } = require('esm')(module)('../src')

const articlesCollectionName = 'articles'
const tagCollectionName = 'tags'

module.exports = {
  async up(db, client) {
    const isArticlesCollectionExisting =
      await DatabaseHelper.isCollectionExisting(articlesCollectionName, db)
    if (!isArticlesCollectionExisting) {
      await db.createCollection(articlesCollectionName)
    }

    const isTagCollectionExisting = await DatabaseHelper.isCollectionExisting(
      tagCollectionName,
      db
    )
    if (!isTagCollectionExisting) {
      await db.createCollection(tagCollectionName)
    }
  },

  async down(db, client) {
    const isArticlesCollectionExisting =
      await DatabaseHelper.isCollectionExisting(articlesCollectionName, db)
    if (isArticlesCollectionExisting) {
      await db.collection(articlesCollectionName).drop()
    }

    const isTagCollectionExisting = await DatabaseHelper.isCollectionExisting(
      tagCollectionName,
      db
    )
    if (isTagCollectionExisting) {
      await db.collection(tagCollectionName).drop()
    }
  },
}
