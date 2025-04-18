import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import api from '../api';

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<{title: string, content: string} | null>(null);
    
    useEffect(() => {
        const fetchPost = async () => {
            const response = await api.get(`/posts/${id}`);
            setPost(response.data);
        };
        
        fetchPost();
    }, [id]);
    
    if (!post) return <div>加载中...</div>;
    
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <div className="post-content">
                <MDEditor.Markdown source={post.content} />
            </div>
        </div>
    );
}
