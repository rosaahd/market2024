const express = require('express')
const cors = require('cors')
const app = express()
const productosAPI =require('./rutas/productos')
const carritoAPI = require('./rutas/carrito')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

productosAPI(app)
carritoAPI(app)
app.use(express.static('public'))

var server = app.listen('8080', () => {
    console.log(`servidor escuchando en ${server.address().port}`)
})

