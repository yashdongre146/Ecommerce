const mongoose = require('mongoose');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongodbConnect = async (callback) => {
    try {
        const client = await MongoClient.connect('mongodb+srv://yashdongre146:clashofclans02@cluster0.0r09782.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        _db = client.db();
        callback();
        console.log("Connected!");
    } catch (error) {
        console.log(error);
    }
}

const getdb = () =>{
    if (_db) {
        return _db;
    }
    throw "No Db Found!"
}
exports.mongodbConnect = mongodbConnect;
exports.getdb = getdb;
// module.exports = mongodbConnect;