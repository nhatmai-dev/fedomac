import env from 'env-var'

export default {
  host: env.get('DB_HOST').required().asString(),
  port: env.get('DB_PORT').required().asPortNumber(),
  name: env.get('DB_NAME').required().asString(),
  username: env.get('DB_USERNAME').required().asString(),
  password: env.get('DB_PASSWORD').required().asString(),
}
