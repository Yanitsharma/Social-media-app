import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./routes/App.jsx";
import CreatePost from "./components/CreatePost.jsx";
import PostList from "./components/PostList.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/app",
    element: <App />,
    children: [
      { path: "/app", element: <PostList /> },
      {
        path: "/app/create-post",
        element: <CreatePost />,
        
      },
      
    ],
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/",
    element:<Signup/>
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);