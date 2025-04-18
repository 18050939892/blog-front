import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api'
import Editor from '../../components/Editor.tsx'
import { Save } from 'lucide-react'
import './index.less'
export default function PostDetail() {
    const {id} = useParams()
    const [post, setPost] = useState<{
        title: string,
        content: string,
        comments: [{user: string, content: string}]
    } | null>(null)
    const [content, setContent] = useState('')
    // const navigate = useNavigate()
    const [height] = useState(window.innerHeight-40.8)
    const fetchPost = async () => {
        const response = await api.get(`/posts/${id}`)
        setPost(response.data)
    }
    useEffect(() => {
        fetchPost()
    }, [id])
    const savePost = async () => {
        
        await api.put(`/posts/comment`, {username: id ? 'user' : 'visitor', content, id}).then((res) => {
            console.log(res.data)
        })
        fetchPost()
    }
    if (!post) return <div>加载中...</div>
    
    return (
        <div className="comment-total"
        >
            <div className="cover" style={{ height:height}}>
            </div>
            <div className="comments-show">
                <h1 className="text-2xl font-bold mb-4">记录：{post.title}</h1>
                <div className="post-content">
                    {post.content}
                </div>
</div>
            
            <div className="comment-input">
                <div className="comment-content">
                   <div>评论区：</div>
                {post.comments.map((comment,index) => (
                    <p key={index}>{comment.user == 'user' ? '🖊️创作者' : '🚶‍♂️游客'}:&nbsp;{comment.content}</p>
                ))}
                </div>
                <div className='input-f' ><Editor value={content} onChange={setContent} /></div>
                <button onClick={savePost} className="mt-4 p-2 bg-blue-500 text-white flex items-center">
                    <Save style={{position:'absolute',left:'0',top:'10px'}} size={30} className="mr-2" />
                    保存记录
                </button>
            </div>
        
        </div>
    )
}
