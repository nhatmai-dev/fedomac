import env from 'env-var'

const port = env.get('PORT').required().asPortNumber()

export default { port }
