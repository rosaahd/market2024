const express = require('express')
const CarritoService = require('../servicios/carritoService')

function carritoAPI(app){
    const router = express.Router()

    app.use('/api/carrito', router)
    const carritoService = new CarritoService()


    router.get('/', async function (req, res, next){
        try{
            const productosEnCarrito = await carritoService.getProductosEnCarrito()
            res.status(200).json(
                {
                    data: productosEnCarrito,
                    message: 'datos de carrito recuperados con éxito'
                }
            )
        } catch(err){
            console.log(`se produjo un error ${err}`)
        } 
    })

    router.post('/', async function (req, res, next){
        try{
            const {body: producto} = req; 

            const idProductoAnadido = await carritoService.anadirProductoCarrito(producto)
            res.status(201).json(
                {
                    data: idProductoAnadido,
                    message: 'datos de carrito recuperados con éxito'
                }
            )
        } catch(err){
            console.log(`se produjo un error ${err}`)
            next(err)
        } 
    })

    router.put('/:productId', async function (req, res, next){
        try{
            const productId = req.params.productId; 
            const cantidad = req.body.cantidad
            console.log(`cantidad ${cantidad}`) 

            console.log(`modificando ${productId}`)
            const idProductoModificado = await carritoService.modificarProductoCarrito(productId, cantidad)
            res.status(201).json(
                {
                    data: idProductoModificado,
                    message: 'datos de carrito modificados con éxito'
                }
            )
        } catch(err){
            console.log(`se produjo un error ${err}`)
            next(err)
        } 
    })

    router.delete('/:productId', async function (req, res, next){
        try{
            const productId = req.params.productId; // body = req.body; tarea = body  / los : definen un alias

            const idProductoBorrado = await carritoService.eliminarProductoCarrito(productId)
            res.status(200).json(
                {
                    data: idProductoBorrado,
                    message: 'datos de carrito eliminados con éxito'
                }
            )
        } catch(err){
            console.log(`se produjo un error ${err}`)
            next(err)
        } 
    })
}

module.exports = carritoAPI