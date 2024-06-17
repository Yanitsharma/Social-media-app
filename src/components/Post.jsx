// import YanitSharma from './image.jpeg.jpg'
// import IITBHU from './IIT BHU.jpg'

import { useContext } from "react";
import {PostList as PostListData } from "../store/post-list-store";
import { useNavigate } from "react-router-dom";
const Post=({post})=>{
 const {deletePost} =useContext(PostListData)
 const {reactionIncr}=useContext(PostListData)
 const navigate=useNavigate()
  return <>
  <div className="card" style={{width: "18rem",margin:"15px"}}>
  <img src={post.img} className="card-img-top" alt="Post"/>
  <button type="button" className="btn-close bt" onClick={()=>deletePost(post._id)} aria-label="Close"></button>
  <div className="card-body">
  <button type="button" className="btn btn-primary position-relative but" onClick={()=>{reactionIncr(post._id)
    navigate("/app")
  }}>
  Like
  <span key={post._id} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {post.reactions}
    <span className="visually-hidden">unread messages</span>
  </span>
</button>
    <h5 className="card-title">{post.title}</h5>
    <p className="card-text">{post.body}</p>
   
          <span className="badge text-bg-primary hashtag sp">
            {post.tags}
          </span>
        
  </div>
</div>
</>
}
export default Post;