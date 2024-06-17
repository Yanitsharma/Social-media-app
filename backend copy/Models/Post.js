const mongoose=require('mongoose');
const postSchema= new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  body:{
    type:String,
     required:true,
  },
  reactions:{
  type:Number,
  default:0
  },
  tags:{
    type:String,
  },
  img:{
   type:String,
  }

})

const Post= mongoose.model('Post',postSchema);
module.exports=Post;