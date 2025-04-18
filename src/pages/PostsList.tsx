import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash } from 'lucide-react';
import api from '../api';

export default function PostsList() {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await api.get('/posts');
            setPosts(response.data);
        };
        
        fetchPosts();
    }, []);
    
    const deletePost = async (id: string) => {
        if (window.confirm('确定要删除这篇文章吗？')) {
            await api.delete(`/posts/${id}`);
            setPosts(posts.filter((post: any) => post._id !== id));
        }
    };
    
    return (
        <div className="p-4">
            <h2 className="text-xl mb-4">文章管理</h2>
            <div className="space-y-2">
                {posts.map((post: any) => (
                    <div key={post._id} className="border p-3 rounded flex justify-between items-center">
                        <span>{post.title}</span>
                        <div className="flex gap-2">
                            <Link to={`/admin/edit/${post._id}`} className="p-1 text-blue-500">
                                <Edit size={16} />
                            </Link>
                            <button onClick={() => deletePost(post._id)} className="p-1 text-red-500">
                                <Trash size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
