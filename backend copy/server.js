const express=require('express');
const db=require('./db');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(cors());
const User =require('./Models/user');
const Post=require('./Models/Post');

app.post('/api/signup',async (req,res)=>{
  try{
    const data=req.body;
    const newUser=new User(data);

    const response=await newUser.save();
    console.log('data saved');
     res.status(200).json(response);
  }
  catch(error){
     console.log(error);
     res.status(500).json({error:'internal server error'});
  }
})
app.post('/api/login',async (req,res)=>{
  try{
    const {username, password} = req.body;

    // Find the user by username
    const user = await User.findOne({username: username});

    // If user does not exist or password does not match, return error
    if( !user || !( user.password===password)){
        return res.status(401).json({error: 'Invalid username or password'});
    }
    console.log('logged in');
    res.status(200).json(user);
  }
  catch(error){
    console.log(err);
    res.status(500).json({err:'internal server error'});
  }
})
app.get('/api/Home',async (req,res)=>{
  try{
     const user=await User.find();
     res.status(200).json(user);

  }
  catch(error){
    console.log(err);
    res.status(500).json({err:'internal server error'});
  }
})
app.post('/api/post',async (req,res)=>{
  try{
    const newPost=new Post(req.body);
    const response=await newPost.save();
    console.log('data saved');
    res.status(200).json(response);
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:'internal server error'});
  }
})
app.get('/api/post',async(req,res)=>{
  try{
     const post=await Post.find();
     res.status(200).json(post);
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:'internal server error'});
  }
})
app.put('/api/:id',async (req,res)=>{
  try{
    const postId=req.params.id;
    const updatedPost=req.body;
    const response = await Post.findByIdAndUpdate(postId,updatedPost,{
   new:true,
   runValidators:true,
    })
    if(!response){
      return res.status(404).json({error:'post not found'});
    }
    console.log('data updated');
    res.status(200).json(response);
  }
catch(err){
  console.log(err);
  res.status(500).json({err:'internal server error'});
}

})
app.delete('/api/:id',async(req,res)=>{
 try{
  const postId=req.params.id;
  const response=await Post.findByIdAndDelete(postId);
  if(!response){
    return res.status(404).json({error:'post not found'});
  }
  console.log('data deleted');
  res.status(200).json(response);
 }
 catch(error){
  console.log(error);
 }
})


app.listen(3000,()=>{
  console.log(`server is running on 3000`);
})