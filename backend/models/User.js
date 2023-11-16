const mongoose = require('mongoose')
const { Schema } = mongoose;
 const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
 
    date:{
        type:Date,
        default:Date.now
    },
 
});
const User =  mongoose.model('user',UserSchema);
// for unique email and values no duplicate  email values are allowed(index corresponding to email)
// User.createIndexes();
module.exports = User