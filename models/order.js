const getdb = require('../utils/database').getdb;
const mongodb = require('mongodb');

class Order{
    constructor(products){
        this.products = products
    }
    save(){
        const db = getdb();
        return db.collection('order').insertOne(this);
    }
    static findAll(){
        const db = getdb();
        return db.collection('order').find().toArray();
    }
}

module.exports = Order