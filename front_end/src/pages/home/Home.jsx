import React, {useState} from 'react'
import { Carousel, Divider, Row, Col, Button, Space } from 'antd'
import { Link } from 'react-router-dom'
import './styles.scss'

const topHighlightEx= [
    {
        title: "Lập trình web",
        description: "Lập trình web là công việc với nhiệm vụ nhận tất cả dữ liệu từ các bộ phận thiết kế và chuyển thành một website hoàn chỉnh",
        image: "https://lamweb.vn/wp-content/uploads/2020/09/lap-trinh-web-la-gi.jpg"
    },
    {
        title: "Tự học guitar",
        description: "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
        image: "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg"
    },
    {
        title: "Nâng cao toán học cho trẻ",
        description: "Những câu đố toán học dành cho trẻ nhỏ giúp rèn luyện khả năng tính toán. Tuy nhiên các bạn nhỏ cần tỉnh táo, chú ý phép nhân chia khiến cho các bạn nhỏ dễ bị nhầm lẫn.",
        image: "https://media-cdn.laodong.vn/Storage/NewsPortal/2020/3/13/790705/Cau-Do-Toan-Hoc0-01.jpg?w=888&h=592&crop=auto&scale=both"
    },

]

const top10= [
    {
        title: "Lập trình web",
        description: "Lập trình web là công việc với nhiệm vụ nhận tất cả dữ liệu từ các bộ phận thiết kế và chuyển thành một website hoàn chỉnh",
        image: "https://lamweb.vn/wp-content/uploads/2020/09/lap-trinh-web-la-gi.jpg"
    },
    {
        title: "Tự học guitar",
        description: "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
        image: "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg"
    },
    {
        title: "Nâng cao toán học cho trẻ",
        description: "Những câu đố toán học dành cho trẻ nhỏ giúp rèn luyện khả năng tính toán. Tuy nhiên các bạn nhỏ cần tỉnh táo, chú ý phép nhân chia khiến cho các bạn nhỏ dễ bị nhầm lẫn.",
        image: "https://media-cdn.laodong.vn/Storage/NewsPortal/2020/3/13/790705/Cau-Do-Toan-Hoc0-01.jpg?w=888&h=592&crop=auto&scale=both"
    },
    {
        title: "Lập trình web",
        description: "Lập trình web là công việc với nhiệm vụ nhận tất cả dữ liệu từ các bộ phận thiết kế và chuyển thành một website hoàn chỉnh",
        image: "https://lamweb.vn/wp-content/uploads/2020/09/lap-trinh-web-la-gi.jpg"
    },
    {
        title: "Tự học guitar",
        description: "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
        image: "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg"
    },
    {
        title: "Nâng cao toán học cho trẻ",
        description: "Những câu đố toán học dành cho trẻ nhỏ giúp rèn luyện khả năng tính toán. Tuy nhiên các bạn nhỏ cần tỉnh táo, chú ý phép nhân chia khiến cho các bạn nhỏ dễ bị nhầm lẫn.",
        image: "https://media-cdn.laodong.vn/Storage/NewsPortal/2020/3/13/790705/Cau-Do-Toan-Hoc0-01.jpg?w=888&h=592&crop=auto&scale=both"
    },
    {
        title: "Lập trình web",
        description: "Lập trình web là công việc với nhiệm vụ nhận tất cả dữ liệu từ các bộ phận thiết kế và chuyển thành một website hoàn chỉnh",
        image: "https://lamweb.vn/wp-content/uploads/2020/09/lap-trinh-web-la-gi.jpg"
    },
    {
        title: "Tự học guitar",
        description: "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
        image: "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg"
    },
    {
        title: "Nâng cao toán học cho trẻ",
        description: "Những câu đố toán học dành cho trẻ nhỏ giúp rèn luyện khả năng tính toán. Tuy nhiên các bạn nhỏ cần tỉnh táo, chú ý phép nhân chia khiến cho các bạn nhỏ dễ bị nhầm lẫn.",
        image: "https://media-cdn.laodong.vn/Storage/NewsPortal/2020/3/13/790705/Cau-Do-Toan-Hoc0-01.jpg?w=888&h=592&crop=auto&scale=both"
    },
    {
        title: "Lập trình web",
        description: "Lập trình web là công việc với nhiệm vụ nhận tất cả dữ liệu từ các bộ phận thiết kế và chuyển thành một website hoàn chỉnh",
        image: "https://lamweb.vn/wp-content/uploads/2020/09/lap-trinh-web-la-gi.jpg"
    },
]

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
    const [topView, setTopView] = useState(top10);
    const [topNew, setTopNew] = useState(top10);
    const [topHighlight, setTopHightLight] = useState(topHighlightEx)
    const [topCategory, setTopCategory] = useState(topCatEx)

    return(
        <div className="home-container">
            <Carousel autoplay effect="fade" className="carousel-container">
                {
                    topHighlight.map((item, index)=>
                        <div key={index}>
                            <Link to="/">
                                <img 
                                    style={{width: '100%', height: 450, objectFit: 'cover' }} 
                                    alt={item.title} 
                                    src={item.image}
                                />
                            </Link>
                            <div style={{ height: 100, opacity: 0.7, backgroundColor: 'black', display:'flex', flexDirection: 'column'}}>
                                <Link to="/" style={{fontWeight: 'bold', color: 'white', fontSize: 24}}>{item.title}</Link>
                                <Link to="/" style={{fontWeight: 'bold', color: 'white', fontSize: 14}}>{item.description}</Link>
                            </div>
                        </div>
                    )
                }
            </Carousel>
            <Divider/>
            <h1 style={{fontWeight: 'bold'}}>Top 10 khoá học được xem nhiều nhất</h1>
            <Row>
                {
                    topView.map((item, index)=>{
                        return(
                            <Col span={12} style={{padding: 15}}>
                                <img 
                                    style={{width: '100%', height: '80%', objectFit: 'cover' }} 
                                    alt={item.title} 
                                    src={item.image}
                                />
                                <div style={{ height: '20%', opacity: 0.7, backgroundColor: 'black', textAlign: 'left'}}>
                                    <div style={{fontWeight: 'bold', color: 'white', fontSize: 14, marginBottom: 5,  marginLeft: 5, marginRight: 5}}>{item.title}</div>
                                    <div style={{color: 'white', fontSize: 12,  marginLeft: 5, marginRight: 5}}>{item.description}</div>
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
                    topNew.map((item, index)=>{
                        return(
                            <Col span={12} style={{padding: 15}}>
                                <img 
                                    style={{width: '100%', height: '80%', objectFit: 'cover' }} 
                                    alt={item.title} 
                                    src={item.image}
                                />
                                <div style={{ height: '20%', opacity: 0.7, backgroundColor: 'black', textAlign: 'left'}}>
                                    <div style={{fontWeight: 'bold', color: 'white', fontSize: 14, marginBottom: 5,  marginLeft: 5, marginRight: 5}}>{item.title}</div>
                                    <div style={{color: 'white', fontSize: 12,  marginLeft: 5, marginRight: 5}}>{item.description}</div>
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
                        return(<Button key={index}>{item.categoryName}</Button>)
                    })
                }
            </Space>
            <Divider/>
        </div>
    )
}

export default Home