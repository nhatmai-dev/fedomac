import multer from 'multer'

const maxFileSize = 3 * 1024 * 1024 // 3 MB
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxFileSize },
})

export const singleFileUpload = upload.single('file')
