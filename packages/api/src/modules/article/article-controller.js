import httpStatus from 'http-status'

import { articleService } from './article-service'

class ArticleController {
  /**
   * constructor
   * @param {ArticleService} articleService
   */
  constructor(articleService) {
    this.articleService = articleService
    this.get = this.get.bind(this)
    this.post = this.post.bind(this)
  }

  async get(req, res) {
    const data = await this.articleService.read(req.params.id)
    return res.send({ data })
  }

  async post(req, res) {
    const data = await this.articleService.create(req.body)
    return res.status(httpStatus.CREATED).send({ data })
  }
}

export const articleController = new ArticleController(articleService)
