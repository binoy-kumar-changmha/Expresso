import './App.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/SideBar'
import Footer from '../components/Footer'
// import CreatePost from '../components/CreatePost'
// import PostList from '../components/PostList'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import PostListProvider from '../store/post-list-store'
import { Outlet } from 'react-router-dom'

function App() {
  const [selectedTab, setSelectedTab] = useState("Home")

  return (
    <PostListProvider>
      <div className="app-container">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab}></Sidebar>
        <div className="content">
          <Navbar></Navbar>
          {/* { selectedTab === "Home" ? <PostList></PostList> : <CreatePost></CreatePost>} */}
          <Outlet/>
          <Footer></Footer>
        </div>
      </div>
    </PostListProvider>
  )
}

export default App