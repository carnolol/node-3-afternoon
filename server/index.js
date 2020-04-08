const express = require('express')
const massive = require('massive')
require('dotenv').config()
const app = express()
app.use(express.json())
const{SERVER_PORT, CONNECTION_STRING}=process.env
const productsCtrl = require('./controllers/products_controller')

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbInstance => {
    console.log('DB IS CONNECTED')
    app.set('db', dbInstance)
}).catch(error => console.log(`OOPS YOU GOT AN ${error}`))


app.get('/api/products', productsCtrl.getAllProducts)
app.get('/api/products/:id', productsCtrl.getOneProduct)
app.post('/api/products', productsCtrl.createProduct)
app.put('/api/products/:id', productsCtrl.updateProduct)
app.delete('/api/products/:id', productsCtrl.deleteProduct)




app.listen(SERVER_PORT, () => console.log(`Docking at port ${SERVER_PORT}`))