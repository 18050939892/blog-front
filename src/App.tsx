import { Routes, Route, Link } from 'react-router-dom'
import { Home, Edit, List, User,  ChevronRight } from 'lucide-react'
import EditPost from './pages/EditPost'
import PostsList from './pages/PostsList'
import PostDetail from './pages/PostDetail'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Detail from './pages/Detail'
import './App.css'
import { useState } from 'react'
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!localStorage.getItem('token'));
    return (
        <div className="container mx-auto">
            <header className="p-4 border-b mb-4">
                <nav className="flex gap-4">
                    <Link to="/" className="flex items-center"><Home  size={25} className="mr-1" />首页</Link>
                    {!isLoggedIn &&  <Link to="/admin/posts" className="flex items-center"><List   size={25} className="mr-1" />记录管理</Link> }
                    {!isLoggedIn && <Link to="/admin/new" className="flex items-center"><Edit   size={25} className="mr-1" />新增记录</Link> }
                    {!isLoggedIn && <Link to="/" className="flex items-center" onClick={()=>{
                        localStorage.removeItem('token');
                        window.location.reload();
                    }}><User size={25} className="mr-1" />退出登陆</Link> }
                    {isLoggedIn && <Link to="/admin/detail" className="flex items-center"><ChevronRight   size={25} className="mr-1" />关于博客</Link> }
                    {isLoggedIn &&
                        <Link to="/admin/login" className="flex items-center"><User size={25} className="mr-1" /> 博主登陆</Link>}
                </nav>
            </header>
            
            <main >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/post/:id" element={<PostDetail isLoggedIn={isLoggedIn} />} />
                    <Route path="/admin/posts" element={<PostsList />} />
                    <Route path="/admin/new" element={<EditPost />} />
                    <Route path="/admin/edit/:id" element={<EditPost />} />
                    <Route path="/admin/detail" element={<Detail />} />
                    <Route path="/admin/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
                </Routes>
            </main>
        </div>
    )
}

export default App
