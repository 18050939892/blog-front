import { Routes, Route, Link } from 'react-router-dom'
import { Home, Edit, List } from 'lucide-react'
import EditPost from './pages/EditPost'
import PostsList from './pages/PostsList'
import PostDetail from './pages/PostDetail'
import HomePage from './pages/HomePage'

function App() {
    return (
        <div className="container mx-auto">
            <header className="p-4 border-b mb-4">
                <h1 className="text-2xl font-bold mb-4">我的博客</h1>
                <nav className="flex gap-4">
                    <Link to="/" className="flex items-center"><Home size={16} className="mr-1" /> 首页</Link>
                    <Link to="/admin/posts" className="flex items-center"><List size={16} className="mr-1" /> 文章管理</Link>
                    <Link to="/admin/new" className="flex items-center"><Edit size={16} className="mr-1" /> 写文章</Link>
                </nav>
            </header>
            
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/post/:id" element={<PostDetail />} />
                    <Route path="/admin/posts" element={<PostsList />} />
                    <Route path="/admin/new" element={<EditPost />} />
                    <Route path="/admin/edit/:id" element={<EditPost />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
