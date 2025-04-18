import { useEffect, useState } from 'react'
import api from '../../api'
import './index.less'
import { useNavigate } from 'react-router-dom'
import treeImage from '../../assets/tree.jpg'
import { useLocation } from 'react-router-dom'
interface Props {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    setIsLoggedIn: Function
}
export default function Index(props:Props) {
    const [, setPosts] = useState([])
    const {setIsLoggedIn} =props;
    const navigate = useNavigate()
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await api.get('/posts/')
            setPosts(response.data)
        }
        fetchPosts()
    }, [])
    
    const [isAnimated, setIsAnimated] = useState(false);
    const location = useLocation();
    
    useEffect(() => {
        setIsAnimated(false);
        setTimeout(() => setIsAnimated(true),50);
    }, [location.pathname]);
    
    return (
        <div className="Login">
            <img
                className="back-tree" src={treeImage} alt="" style={{
                top: isAnimated ? '-9px' : '',
            }}
            />
            <h2 className="login">创作者登陆</h2>
            <form
                onSubmit={async (e: any) => {
                    e.preventDefault()
                    const a = await api.post(`/auth/login`, {
                        password: e.target.elements.password.value.toString(),
                        username: e.target.elements.number.value.toString()
                    })
                    localStorage.setItem('token', a.data.token)
                    setIsLoggedIn(!localStorage.getItem('token'))
                    navigate('/')
                }}
            >
                <div className="number form-input"><label htmlFor="number">账号:</label>&nbsp;&nbsp;<input
                    name="number"
                /></div>
                <br />
                <div className="password form-input"><label htmlFor="password">密码:</label>&nbsp;&nbsp;<input
                    type="password" name="password"
                /></div>
                <br />
                <button type="submit">登陆</button>
            </form>
            <img
                className="back-tree" src={treeImage} alt="" style={{
                top: isAnimated ? '-9px' : '',
            }}
            />
        </div>
    )
}
{/*<button onClick={async ()=>{*/}
{/*    await api.post(`/auth/register`, { username: 'lzj', password: 'abc', email:'225@qq.com' });*/}
{/*}}>临时注册</button>*/}
