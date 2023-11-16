const mongoose = require('mongoose')
const { Schema } = mongoose;
 const NotesSchema = new Schema({
    // to link notes with user(using primary key of auth.js as foreign key in notes.js)
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        

    },
    tag:{
        type:String,
        default:"General"
    },
 
    date:{
        type:Date,
        default:Date.now
    },
 
});
module.exports = mongoose.model('notes',NotesSchema);