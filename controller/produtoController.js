let database = require('../data/cardData')
const { v4: uuidv4 } = require('uuid')

const baseURL = '/cards'

const getCartaById = (id) => database.map(c => c.id).indexOf(id);

module.exports = (router) => {
    
    router.get(baseURL, (req, res) => {
        console.log('CardsController')
        res.json(database);
    })

    router.get(baseURL + '/:id', (req, res) => {
        const id = req.params.id
        const card = database.find(item => item.id == id)
        res.json(card);
    })

    router.post(baseURL, (req, res) => {
        const novoCard = {
            id: uuidv4(),
            nome: req.body.nome,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            image: req.body.image
        }
        
        database.push(novoCard)
        res.status(201).send()
    })

    router.put(baseURL+'/:id', (req, res) => {

        const id = req.params.id
        const carta = database.find(item => item.id == id)
        
        if(req.body.preco){
            carta.preco = req.body.preco
        }
        if(req.body.nome){
            carta.nome = req.body.nome
        }
        
        if(req.body.quantidade){
            carta.quantidade = req.body.quantidade
        }
        if(req.body.image){
            carta.image = req.body.image
        }
        
        res.json(carta);
    })

    router.delete(baseURL+'/:id', (req, res) => {

        const id = req.params.id
        database.splice(getCartaById(id), 1);
        res.status(200).send('Deletado!')
    })
}
