const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId


const USER = 'apedreroes'
const PASSWORD =  '123456789qwerty'
const DB_NAME = 'Market'
const DB_HOST = 'market.ate3aon.mongodb.net'

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/?appName=${DB_NAME}`

class MongoLib {
    constructor(){
        this.veces = 0;
    }

    async connect() {
            this.veces++;     
            console.log(`Connect invocado ${this.veces} veces`);

            if (MongoLib.connection != null) {
                return MongoLib.connection.db(DB_NAME);
            } else {
                try {
                    MongoLib.connection = await MongoClient.connect(MONGO_URI)
                    return MongoLib.connection.db(DB_NAME)
                } catch(e){
                    console.log('error en conexión a BBDD')
                    return e
                }
            }
    }
    async  getAllProducts(collection) {
        try {
            let db = await this.connect()
            let result = await db.collection(collection).find().toArray();
            return result;
        } catch (e) {
            return e;
        }
    }

    async  getAllProductsInCart(collection) {
        // No utilizada ya que, por ahora, todos los productos en el carrito de la compra se recuperar del localStorage
        try {
            let db = await this.connect()
            let result = await db.collection(collection).find().toArray();
            return result;
        } catch (e) {
            return e;
        }
    }
    async addProductToCart(collection, data) {
        try {
                let db = await this.connect()
                let result = await db.collection(collection).insertOne(data)
                return result.insertedId
         } catch(e){
            console.log('error al insertar')
            return e
         }
    }

    async modifyProductFromCart(collection, id, quantity){
        try {
                let db = await this.connect()
                let result = await db.collection(collection).updateOne({ _id: id }, { $set: {quantity: quantity } }, { upsert: true })
                return result
         } catch(e){
            console.log('error al modificar')
            return e
         }  
    }

    async deleteProductFromCart(collection, id) {
        try {
                let db = await this.connect()
                let result = await db.collection(collection).deleteOne({ _id: id})
                return result
         } catch(e){
            console.log('error al borrar')
            return e
         }
    }
}
module.exports = MongoLib;


