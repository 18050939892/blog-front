import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import './index.less'
import { Swiper, SwiperSlide } from '../Swiper'
import '../Swiper/swiper.css'

export default function HomePage() {
    const [posts, setPosts] = useState([])
    const [height] = useState(window.innerHeight-40.8)
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await api.get('/posts/')
            setPosts(response.data)
        }
        fetchPosts()
    }, [])
    return (
        <div className="p-4 total">
            <div className="cover" style={{ height:height}}>
            </div>
            <div className="content-top">
                <Swiper navigation={true} defaultTz={false} pagination={{clickable: true}} time={true} className="mySwiper">
                    <SwiperSlide><a href='https://github.com/18050939892' target='_blank'><p>My Github</p></a></SwiperSlide>
                    <SwiperSlide><a ><p>加油！努力！</p><p>奋斗向前!</p></a></SwiperSlide>
                </Swiper>
            </div>
            <div className="space-y-4 content-main">
                <h2 className="text-xl mb-4">学习记录贴</h2>
                {posts.map((post: any) => (
                    <div key={post._id} className="border p-4 rounded content-demo">
                        <h3 className="text-lg font-semibold">
                            记录标题： <Link to={`/post/${post._id}`} className="text-blue-500 hover:underline">
                            {post.title}
                        </Link>
                        </h3>
                        <p className="text-gray-500 text-sm">
                            记录时间：{new Date(post.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
            <div className="content-aside">
                <div className="aside-top">
                    <h2>博主信息</h2>
                    <ul>
                        <li>姓名：林智杰</li>
                        <li>性别：男</li>
                        <li>学历：本科</li>
                        <li>毕业院校：福州理工学院</li>
                        <li>邮箱:deerkesi3815@gmail.com</li>
                        <li>现况:待业</li>
                    </ul>
                </div>
                <div className="aside-buttom">
                    <h2>扫我关注</h2>
                    <div>
                        <div className="one"></div>
                        <div className="two"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
