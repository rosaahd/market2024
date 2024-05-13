const MongoLib = require('../lib/mongo')

class CarritoService{
    constructor(){
        this.collection = 'carrito'
        this.mongoDB = new MongoLib()
    }
    async getProductosEnCarrito(){
        const productos = await this.mongoDB.getAllProductsInCart(this.collection)
        return productos || []
    }

    async anadirProductoCarrito( data){    
        const mensaje  = await this.mongoDB.addProductToCart(this.collection, data)
        return mensaje || []
    }

    async modificarProductoCarrito(id,cantidad){
        const mensaje  = await this.mongoDB.modifyProductFromCart(this.collection, id, cantidad)
        return mensaje || []
    }

    async eliminarProductoCarrito(id){
        const mensaje  = await this.mongoDB.deleteProductFromCart(this.collection, id)
        return mensaje || []

    }
} 

module.exports = CarritoService