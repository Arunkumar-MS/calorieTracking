const { ObjectId } = require('mongodb');
const mongoose=require('mongoose');
  
const AuthSchema = new mongoose.Schema({
    userId:ObjectId,
    token:String,
    password: String,
});
  
module.exports = mongoose.model('auth', AuthSchema, 'auth');