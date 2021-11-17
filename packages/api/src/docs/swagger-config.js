import swaggerJsDoc from 'swagger-jsdoc'

const options = {
  definition: {
    info: {
      title: 'Fedomac API',
      description: 'API documentation',
      version: '0.0.0',
    },
    host: 'localhost:3000',
    basePath: '/api',
    openapi: '3.0.0',
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/modules/*/*-router.js'],
}

export default swaggerJsDoc(options)
