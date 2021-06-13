import React, {useState, useEffect} from 'react'
import { Carousel, Divider, Row, Col, Button, Space } from 'antd'
import { Link } from 'react-router-dom'
import './styles.scss'
import { httpClient } from '../../api'

const topCatEx = [
    {
        id: 0,
        categoryName: "Đàn guitar"
    },
    {
        id: 0,
        categoryName: "Vật lý"
    },
    {
        id: 0,
        categoryName: "Lập trình web"
    },
    {
        id: 0,
        categoryName: "Thể dục"
    },
]

const Home = () => {
    const [topView, setTopView] = useState([]);
    const [topNew, setTopNew] = useState([]);
    const [topHighlight, setTopHightLight] = useState([])
    const [topCategory, setTopCategory] = useState(topCatEx)

    useEffect(()=>{
        const fetchData = async () => {
            const topView_ = await httpClient.course.getCourses({sortBy:"view:desc"})
            const topNew_ = await httpClient.course.getCourses({sortBy:"createdAt:desc"})
            setTopView(topView_.results)
            setTopNew(topNew_.results)
            setTopHightLight(topView_.results)
        }
        fetchData()
    }, [])

    return(
        <div className="home-container">
            <Carousel autoplay effect="fade" className="carousel-container">
                {
                    topHighlight && topHighlight.map((item, index)=>
                        <div key={`highLight${index}`}>
                            <Link to="/">
                                <img 
                                    style={{width: '100%', height: 450, objectFit: 'cover' }} 
                                    alt={item.title} 
                                    src={item.picture}
                                />
                            </Link>
                            <div style={{ height: 100, opacity: 0.7, backgroundColor: 'black', display:'flex', flexDirection: 'column'}}>
                                <Link to="/" style={{fontWeight: 'bold', color: 'white', fontSize: 24}}>{item.title}</Link>
                                <Link to="/" style={{fontWeight: 'bold', color: 'white', fontSize: 14}}>{item.shortDescription}</Link>
                            </div>
                        </div>
                    )
                }
            </Carousel>
            <Divider/>
            <h1 style={{fontWeight: 'bold'}}>Top 10 khoá học được xem nhiều nhất</h1>
            <Row>
                {
                    topView && topView.map((item, index)=>{
                        return(
                            <Col span={12} style={{padding: 15}} key={`view${index}`}>
                                <img 
                                    style={{width: '100%', height: '80%', objectFit: 'cover' }} 
                                    alt={item.title} 
                                    src={item.picture}
                                />
                                <div style={{ height: '20%', opacity: 0.7, backgroundColor: 'black', textAlign: 'left'}}>
                                    <div style={{fontWeight: 'bold', color: 'white', fontSize: 14, marginBottom: 5,  marginLeft: 5, marginRight: 5}}>{item.title}</div>
                                    <div style={{color: 'white', fontSize: 12,  marginLeft: 5, marginRight: 5}}>{item.shortDescription}</div>
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
            <Divider/>
            <h1 style={{fontWeight: 'bold'}}>Top 10 khoá học mới nhất</h1>
            <Row>
                {
                    topNew && topNew.map((item, index)=>{
                        return(
                            <Col span={12} style={{padding: 15}} key={`new${index}`}>
                                <img 
                                    style={{width: '100%', height: '80%', objectFit: 'cover' }} 
                                    alt={item.title} 
                                    src={item.picture}
                                />
                                <div style={{ height: '20%', opacity: 0.7, backgroundColor: 'black', textAlign: 'left'}}>
                                    <div style={{fontWeight: 'bold', color: 'white', fontSize: 14, marginBottom: 5,  marginLeft: 5, marginRight: 5}}>{item.title}</div>
                                    <div style={{color: 'white', fontSize: 12,  marginLeft: 5, marginRight: 5}}>{item.shortDescription}</div>
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
            <Divider/>
            <h1 style={{fontWeight: 'bold'}}>Danh sách lĩnh vực được đăng ký học nhiều nhất trong tuần</h1>
            <Space>
                {
                    topCategory.map((item, index)=>{
                        return(<Button key={`category${index}`}>{item.categoryName}</Button>)
                    })
                }
            </Space>
            <Divider/>
        </div>
    )
}

export default Home