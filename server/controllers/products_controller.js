module.exports = {
    getAllProducts:(req, res) => {
        const db = req.app.get('db')
        db.read_products().then( products => {
            res.status(200).send(products)
        }).catch(error => console.log(`OOPS GOT AN ${error}`))
    },
    getOneProduct:(req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.read_product(id).then( product => {
            res.status(200).send(product)
        }).catch(error => console.log(`OOPS GOT AN ${error}`))
    },
    updateProduct:(req, res) => { //put
        const db = req.app.get('db')
        const {desc} = req.query // THIS IS DUMB. SCREW YOU TEST I DO WHAT I WANT
        const {id} = req.params
        db.update_product([id, desc]).then( updatedProduct => {
            res.status(200).send(updatedProduct)
        }).catch(error => console.log(`stupid error ${error}`))
    },
    createProduct:(req, res) => { //post
        const db = req.app.get('db')
        const {name, description, price, image_url} = req.body
        db.create_product([name, description, price, image_url]).then(newProduct => {
            res.status(200).send(newProduct)
        }).catch(error => console.log(`LOOK OUT ITS A HUGE ${error}`))
    },
    deleteProduct:(req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.delete_product(id).then(() => {
            res.status(200).send('PRODUCT TERMINATED')
        }).catch(error => console.log(`WHY DELETE PRODUCT NO WORK? ${error}`))
    }
}