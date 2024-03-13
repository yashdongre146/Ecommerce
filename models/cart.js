const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    productTitle: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})
// define your methods here but with mongoose syntax so no use
// cartSchema.methods.myMethod = function(){
    
// }
module.exports = mongoose.model('Cart', cartSchema)


// const getdb = require('../utils/database').getdb;
// const mongodb = require('mongodb');

// class Cart{
//     constructor(productId, productTitle, quantity, userId){
//         this.productId = productId,
//         this.productTitle = productTitle,
//         this.quantity = quantity,
//         this.userId = userId
//     }
//     save(){
//         const db = getdb();
//         db.collection('cart').insertOne(this);
//     }
//     static findProductInCart(productId, userId){
//         const db = getdb();
//         return db.collection('cart').findOne({productId: productId, userId: new mongodb.ObjectId(userId)})
//     }
//     static findProductsInCart(userId){
//         const db = getdb();
//         return db.collection('cart').find({userId: new mongodb.ObjectId(userId)}).toArray();
//     }
//     static updateQuantity(productId, quantity, userId){
//         const db = getdb();
//         db.collection('cart').updateOne({productId: productId, userId: new mongodb.ObjectId(userId)},{$set: {quantity: quantity}})
//     }
//     static removeItemFromCart(productId, userId){
//         const db = getdb();
//         db.collection('cart').deleteOne({productId: productId, userId: new mongodb.ObjectId(userId)})
//     }
// }

// module.exports = Cart