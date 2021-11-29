import path from 'path'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import Boom from '@hapi/boom'
import { format } from 'date-fns'
import sharp from 'sharp'

import { settings } from '@fedomac/core'

import { fileService } from '../file/file-service'

const imageCategory = {
  ARTICLES: 'articles',
}

const rename = (fileName) => {
  const extension = path.extname(fileName)
  const fileNameWithoutExtension = path.basename(fileName, extension)
  const cappedFileName =
    fileNameWithoutExtension.length > 128
      ? fileNameWithoutExtension.subtring(0, 128)
      : fileNameWithoutExtension
  const now = new Date()
  const timestamp = `_${format(
    new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds()
    ),
    'yyyyMMddHHmmssSSS'
  )}`
  return `${cappedFileName}_${timestamp}${extension}`
}

const compressImageBuffer = async (fileExtension, buffer) => {
  if (/\.png/i.test(fileExtension)) {
    return sharp(buffer).png({ palette: true }).toBuffer()
  }
  if (/\.jp[e]?g$/i.test(fileExtension)) {
    return sharp(buffer).toBuffer()
  }
  if (/\.gif$/i.test(fileExtension)) {
    return buffer
  }
  throw Boom.badRequest('Unsupported file format')
}

class UploadService {
  #fileService

  constructor(fileService) {
    this.s3Client = new S3Client({ region: settings.aws.region })
    this.#fileService = fileService
    this.uploadArticleImage = this.uploadArticleImage.bind(this)
  }

  async uploadArticleImage(fileName, buffer) {
    const standardizedFileName = rename(fileName)
    const compressedImageBuffer = await compressImageBuffer(
      path.extname(fileName),
      buffer
    )

    const putObjectCommand = new PutObjectCommand({
      Bucket: settings.aws.s3.bucketName,
      Key: `${imageCategory.ARTICLES}/${standardizedFileName}`,
      Body: compressedImageBuffer,
    })
    await this.s3Client.send(putObjectCommand)

    const fileUrl = `https://${settings.aws.s3.bucketName}.s3.${settings.aws.region}.amazonaws.com/${imageCategory.ARTICLES}/${standardizedFileName}`

    await this.#fileService.create(fileUrl)

    return fileUrl
  }
}

export const uploadService = new UploadService(fileService)
