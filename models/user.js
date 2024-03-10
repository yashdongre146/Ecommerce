const getdb = require('../utils/database').getdb;
const mongodb = require('mongodb');

class User{
    constructor(username, email){
        this.name = username,
        this.email = email
    }
    save(){
        const db = getdb();
        return db.collection('users').insertOne(this);
    }
    static findUserById(userId){
        const db = getdb();
        return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)})
    }
}

module.exports = User