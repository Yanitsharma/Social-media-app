import { createContext, useReducer, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  reactionIncr:()=>{},
  subPost:()=>{},
});


let data={};
const delete1 = async (pd)=>{
    try{
let response=await axios.delete(`https://social-media-app-4-bm12.onrender.com/api/${pd}`);  
   console.log(response.data);
    }
    catch(error){
   console.log(error);
    }
}

const like= async (data,id)=>{
 try{
    let response=await axios.put(`https://social-media-app-4-bm12.onrender.com/api/${id}`,data);
    console.log(response.data);

 }
 catch(error){
console.log(error);
 }
}
const postListReducer =  (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    currPostList.forEach(post => {
      if(post._id===action.payload.postId){
        delete1(post._id);
      }
    });
    newPostList = currPostList.filter(
      (post) =>(post._id !== action.payload.postId
      )
      
         
    )
  } 

  else if(action.type==="React-Post"){
    currPostList.map((post)=>{
   if(post._id===action.payload.postId){
     post.reactions=eval(post.reactions)+(1)
      data={reactions:post.reactions};
       
     like(data,post._id);
   }
 
   
 })
 newPostList=currPostList;
 action.type="";
}
  else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  else if(action.type==="initial"){
    newPostList=action.payload;
  }
  
  
  return newPostList;
};

const PostListProvider = ({ children }) => { 
  let  DEFAULT_POST_LIST=[];
  useEffect(()=>{
    axios.get("https://social-media-app-4-bm12.onrender.com/api/post").then((res)=>{
      console.log(res.data);
     DEFAULT_POST_LIST=(res.data);
     subPost(DEFAULT_POST_LIST); 
    }

  )},[])

  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );
  
  // let count=1;
  
 const subPost=(DEFAULT_POST_LIST)=>{
  dispatchPostList({
    type:"initial",
    payload:DEFAULT_POST_LIST, 
  })
 }
  const addPost = ( id,postTitle, postBody,reactions, tags,img) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id:id,
        title: postTitle,
        body: postBody,
        reactions:reactions,
        tags: tags,
        img:img,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
    
  };
  const reactionIncr=(postId)=>{
    dispatchPostList({
      type: "React-Post",
      payload: {
        postId,
      },
    });
  }

  return (
    <PostList.Provider value={{ postList, addPost, deletePost, reactionIncr,subPost}}>
      {children}
    </PostList.Provider>
  );
};
  
   

 
  
  // console.log(DEFAULT_POST_LIST);
  
  





export default PostListProvider;