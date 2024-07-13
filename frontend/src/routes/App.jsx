import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Header from '../components/Header';
import SideBar from '../components/SiderBar';
import Footer from '../components/Footer';
import PostProvider from '../store/post-list-store';
import { Outlet } from 'react-router-dom';
function App() {
  return<>
  <PostProvider>
  <div className='container'>
  <SideBar ></SideBar>
  <div className="content">
   <Header></Header>
     <Outlet/>
   <Footer></Footer>
   </div>
   </div>
   </PostProvider>
  </>
}
export default App;
