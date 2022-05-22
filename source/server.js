import express from 'express'

const server = express()

server.use(express.json())

server.get('/', (request, response) => {
  return response.send('Welcome to Node.js Knex Discovery!')
})

export default server
