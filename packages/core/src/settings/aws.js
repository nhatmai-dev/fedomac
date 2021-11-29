import env from 'env-var'

const region = env.get('AWS_REGION').required().asString()
const bucketName = env.get('AWS_S3_BUCKET_NAME').required().asString()

export default { region, s3: { bucketName } }
