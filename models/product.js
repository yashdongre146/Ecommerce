const getdb = require('../utils/database').getdb;

class Product{
    constructor(title, price, description, imageUrl){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save(){
        const db = getdb();
        return db.collection('products').insertOne(this);
    }
}

module.exports = Product;