const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        productTitle: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Order', orderSchema);
// const getdb = require('../utils/database').getdb;
// const mongodb = require('mongodb');

// class Order{
//     constructor(products, userId){
//         this.products = products,
//         this.userId = userId
//     }
//     save(){
//         const db = getdb();
//         return db.collection('order').insertOne(this);
//     }
//     static findAll(userId){
//         const db = getdb();
//         return db.collection('order').find({userId: new mongodb.ObjectId(userId)}).toArray();
//     }
// }

// module.exports = Order