let carrinho = require('../data/carrinhoData')
let cards = require('../data/cardData')

const baseURL = '/carrinho'

const getItemById = (id) => carrinho.map(c => c.id).indexOf(id);

module.exports = (router) => {
    
    router.get(baseURL, (req, res) => {
        console.log('CarrinhoController')
        res.json(carrinho);
    })

    router.get(baseURL+'/total', (req, res) => {
        let valor = 0
        carrinho.map(c => {
            valor += c.preco * c.quantidade
        });
        res.json(valor);
    })

    router.post(baseURL, (req, res) => {
        const item = req.body
        
        if(item.quantidade == 0){
            res.status(400).send('Quantidade indisponivel')
        }else{
            item.quantidade = 1
            carrinho.push(item)
            res.json(item);
        }
    })

    router.post(baseURL+'/finalizar', (req, res) => {
        carrinho.map(i => {           
            const item = cards.find(c => c.id == i.id)        
            item.quantidade -= i.quantidade   
        })

        carrinho = []

        res.status(200).send('Compra realizada!')
    })

    router.put(baseURL+'/:id', (req, res) => {
        const id = req.params.id
        const item = carrinho.find(item => item.id == id)
        
        /*  if(req.body.quantidade){
                item.quantidade = req.body.quantidade
            }
        */
       if(item){
            const quantidade = parseInt(req.query.quantidade)
    
            if(quantidade){
                item.quantidade = quantidade
            }else{
                item.quantidade = item.quantidade + 1
            }
            res.json(item);
       }else{
            res.status(400).send('Item não encontrado!')
       }
    })

    router.delete(baseURL+'/:id', (req, res) => {
        console.log(carrinho)

        const id = req.params.id
        const newList = carrinho.filter((card) =>card.id.toString() !== req.params.id.toString())
        carrinho = newList
        console.log("carrinho", carrinho)
        res.status(200).send('Deletado!')
    })
}
