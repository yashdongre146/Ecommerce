const getdb = require('../utils/database').getdb;
const mongodb = require('mongodb');

class Cart{
    constructor(productId, productTitle, quantity, userId){
        this.productId = productId,
        this.productTitle = productTitle,
        this.quantity = quantity,
        this.userId = userId
    }
    save(){
        const db = getdb();
        db.collection('cart').insertOne(this);
    }
    static findProductInCart(productId, userId){
        const db = getdb();
        return db.collection('cart').findOne({productId: productId, userId: new mongodb.ObjectId(userId)})
    }
    static findProductsInCart(userId){
        const db = getdb();
        return db.collection('cart').find({userId: new mongodb.ObjectId(userId)}).toArray();
    }
    static updateQuantity(productId, quantity, userId){
        const db = getdb();
        db.collection('cart').updateOne({productId: productId, userId: new mongodb.ObjectId(userId)},{$set: {quantity: quantity}})
    }
    static removeItemFromCart(productId, userId){
        const db = getdb();
        db.collection('cart').deleteOne({productId: productId, userId: new mongodb.ObjectId(userId)})
    }
}

module.exports = Cart