const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const bookschema = new Schema({
    name:String,
    genere:String,
    authorId:String,
})


module.exports=mongoose.model('book',bookschema)