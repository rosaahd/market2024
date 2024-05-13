const MongoLib = require('../lib/mongo')

class ProductosService{
    constructor(){
        this.collection = 'products'
        this.mongoDB = new MongoLib()
    }
    async getProductos(){
        const productos = await this.mongoDB.getAllProducts(this.collection)
        return productos || []
    }
} 

module.exports = ProductosService