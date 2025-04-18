import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Edit, Trash } from 'lucide-react'
import api from '../../api'
import './index.less'

export default function PostsList() {
    const [posts, setPosts] = useState([])
    const [height] = useState(window.innerHeight - 40.8)
    const fetchPosts = async () => {
        const response = await api.get('/posts')
        setPosts(response.data)
    }
    useEffect(() => {

        
        fetchPosts()
    }, [])
    
    const deletePost = async (id: string) => {
        if (window.confirm('确定要删除这篇文章吗？')) {
            await api.delete(`/posts/${id}`)
            setPosts(posts.filter((post: any) => post._id !== id))
        }
    }
    
    return (
        <div className="manger-total">
            <div className="cover" style={{height: height}}></div>
            <h2 className="manger-text">文章管理</h2>
            <div className="space">
                {posts.map((post: any) => (
                    <div key={post._id} className="item">
                        <div className="manger-title">
                            <span>记录：{post.title}</span>
                            <span>内容：{post.content}</span>
                        </div>
                        
                        <div className="flex">
                            <Link to={`/admin/edit/${post._id}`} className="p-1 text-blue-500">
                                <Edit size={30} />
                            </Link>
                            <button onClick={() => {
                                deletePost(post._id)
                                fetchPosts()
                            }} className="p-1 text-red-500">
                                <Trash size={30} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
