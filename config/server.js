require('dotenv').config()

const express = require('express');
const server = express();
const cors = require('cors')

server.use(cors())
server.use(express.json())

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`)
})

module.exports = server