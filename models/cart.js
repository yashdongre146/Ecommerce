const getdb = require('../utils/database').getdb;
const mongodb = require('mongodb');

class Cart{
    constructor(productId, productTitle, quantity){
        this.productId = productId,
        this.productTitle = productTitle,
        this.quantity = quantity
    }
    save(){
        const db = getdb();
        db.collection('cart').insertOne(this);
    }
    static findProductInCart(productId){
        const db = getdb();
        return db.collection('cart').findOne({productId: productId})
    }
    static findProductsInCart(){
        const db = getdb();
        return db.collection('cart').find().toArray();
    }
    static updateQuantity(productId, quantity){
        const db = getdb();
        db.collection('cart').updateOne({productId: productId},{$set: {quantity: quantity}})
    }
    static removeItemFromCart(productId){
        const db = getdb();
        db.collection('cart').deleteOne({productId: productId})
    }
}

module.exports = Cart