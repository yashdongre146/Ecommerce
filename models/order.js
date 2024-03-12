const getdb = require('../utils/database').getdb;
const mongodb = require('mongodb');

class Order{
    constructor(products, userId){
        this.products = products,
        this.userId = userId
    }
    save(){
        const db = getdb();
        return db.collection('order').insertOne(this);
    }
    static findAll(userId){
        const db = getdb();
        return db.collection('order').find({userId: new mongodb.ObjectId(userId)}).toArray();
    }
}

module.exports = Order