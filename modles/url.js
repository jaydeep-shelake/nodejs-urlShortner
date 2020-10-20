const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');
shortId.generate();

let Url = new Schema({
   fullUrl:{
       type:String,
       required:true
   },
   shortUrl:{
       type:String,
       required:true,
       default: shortId.generate
   },
   clicks:{
       type:Number,
       required:true,
       default:0,
   }
});

module.exports=mongoose.model('Url',Url);