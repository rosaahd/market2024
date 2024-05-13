const express = require('express')
const ProductosService = require('../servicios/productosService')

function productosAPI(app){
    const router = express.Router()

    app.use('/api/productos', router)
    const productosService = new ProductosService()


    router.get('/', async function (req, res, next){
        try{
            const productos = await productosService.getProductos()
            res.status(200).json(
                {
                    data: productos,
                    message: 'datos recuperados con éxito'
                }
            )
        } catch(err){
            console.log(`se produjo un error ${err}`)
        } 
    })
}

module.exports = productosAPI