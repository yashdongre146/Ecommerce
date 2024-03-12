const getdb = require('../utils/database').getdb;
const mongodb = require('mongodb');

class User{
    constructor(name, email, password){
        this.name = name,
        this.email = email,
        this.password = password
    }
    save(){
        const db = getdb();
        return db.collection('users').insertOne(this);
    }
    static findUserById(userId){
        const db = getdb();
        return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)})
    }
    static findUserByEmail(email){
        const db = getdb();
        return db.collection('users').findOne({email})
    }
}

module.exports = User