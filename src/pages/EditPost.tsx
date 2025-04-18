import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';
import { Save } from 'lucide-react';
import api from '../api';

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                const response = await api.get(`/posts/${id}`);
                setTitle(response.data.title);
                setContent(response.data.content);
            };
            
            fetchPost();
        }
    }, [id]);
    
    const savePost = async () => {
        if (id) {
            await api.put(`/posts/${id}`, { title, content });
        } else {
            await api.post('/posts', { title, content });
        }
        navigate('/admin/posts');
    };
    
    return (
        <div className="p-4">
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full p-2 text-xl mb-4 border"
                placeholder="文章标题"
            />
            <Editor value={content} onChange={setContent} />
            <button onClick={savePost} className="mt-4 p-2 bg-blue-500 text-white flex items-center">
                <Save size={16} className="mr-2" /> 保存文章
            </button>
        </div>
    );
}
