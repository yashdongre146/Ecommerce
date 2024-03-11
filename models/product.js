const getdb = require('../utils/database').getdb;
const mongodb = require('mongodb');

class Product{
    constructor(title, imageUrl, price, description){
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save(){
        const db = getdb();
        return db.collection('products').insertOne(this);
    }
    static update(productId, updatedProduct) {
        const db = getdb();
        return db.collection('products').updateOne(
            { _id: new mongodb.ObjectId(productId) },
            { $set: updatedProduct }
        );
    }
    static delete(productId) {
        const db = getdb();
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(productId) });
    }
    static fetchAll(){
        const db = getdb();
        return db.collection('products').find().toArray();
    }
    static fetchOne(productId){
        const db = getdb();
        return db.collection('products').findOne({_id: new mongodb.ObjectId(productId)});
    }
}

module.exports = Product;