const express = require('express')
const router = express.Router()

const cardsController = require('../controller/produtoController')
const carrinhoController = require('../controller/carrinhoController')

cardsController(router)
carrinhoController(router)

module.exports = router