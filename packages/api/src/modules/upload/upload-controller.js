import httpStatus from 'http-status'

import { uploadService } from './upload-service'

class UploadController {
  #uploadService

  constructor(uploadService) {
    this.#uploadService = uploadService
    this.uploadArticleImage = this.uploadArticleImage.bind(this)
  }

  async uploadArticleImage(req, res) {
    const fileUrl = await this.#uploadService.uploadArticleImage(
      req.file.originalname,
      req.file.buffer
    )
    res.status(httpStatus.CREATED).json({
      data: {
        url: fileUrl,
      },
    })
  }
}

export const uploadController = new UploadController(uploadService)
