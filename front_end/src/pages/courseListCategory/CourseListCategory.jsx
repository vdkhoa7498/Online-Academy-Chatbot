import React, {useState} from 'react'
import { Divider, Row, Col, Rate, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import './styles.scss'

const top10= [
    {
        title: "Lập trình web",
        description: "Lập trình web là công việc với nhiệm vụ nhận tất cả dữ liệu từ các bộ phận thiết kế và chuyển thành một website hoàn chỉnh",
        image: "https://lamweb.vn/wp-content/uploads/2020/09/lap-trinh-web-la-gi.jpg",
        category: "Kinh tế",
        lecturer: "Nguyễn Văn A",
        price: "200000",
        rateScore: 3.9,
        numberOfRate: 249,
    },
    {
        title: "Tự học guitar",
        description: "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
        image: "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg",
        category: "Kinh tế",
        lecturer: "Nguyễn Văn A",
        price: "200000",
        rateScore: 3.9,
        numberOfRate: 249,
    },
    {
        title: "Nâng cao toán học cho trẻ",
        description: "Những câu đố toán học dành cho trẻ nhỏ giúp rèn luyện khả năng tính toán. Tuy nhiên các bạn nhỏ cần tỉnh táo, chú ý phép nhân chia khiến cho các bạn nhỏ dễ bị nhầm lẫn.",
        image: "https://media-cdn.laodong.vn/Storage/NewsPortal/2020/3/13/790705/Cau-Do-Toan-Hoc0-01.jpg?w=888&h=592&crop=auto&scale=both",
        category: "Kinh tế",
        lecturer: "Nguyễn Văn A",
        price: "200000",
        rateScore: 3.9,
        numberOfRate: 249,
    },
    {
        title: "Lập trình web",
        description: "Lập trình web là công việc với nhiệm vụ nhận tất cả dữ liệu từ các bộ phận thiết kế và chuyển thành một website hoàn chỉnh",
        image: "https://lamweb.vn/wp-content/uploads/2020/09/lap-trinh-web-la-gi.jpg",
        category: "Kinh tế",
        lecturer: "Nguyễn Văn A",
        price: "200000",
        rateScore: 3.9,
        numberOfRate: 249,
    },
    {
        title: "Tự học guitar",
        description: "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
        image: "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg",
        category: "Kinh tế",
        lecturer: "Nguyễn Văn A",
        price: "200000",
        rateScore: 3.9,
        numberOfRate: 249,
    },
    {
        title: "Nâng cao toán học cho trẻ",
        description: "Những câu đố toán học dành cho trẻ nhỏ giúp rèn luyện khả năng tính toán. Tuy nhiên các bạn nhỏ cần tỉnh táo, chú ý phép nhân chia khiến cho các bạn nhỏ dễ bị nhầm lẫn.",
        image: "https://media-cdn.laodong.vn/Storage/NewsPortal/2020/3/13/790705/Cau-Do-Toan-Hoc0-01.jpg?w=888&h=592&crop=auto&scale=both",
        category: "Kinh tế",
        lecturer: "Nguyễn Văn A",
        price: "200000",
        rateScore: 3.9,
        numberOfRate: 249,
    },
    {
        title: "Lập trình web",
        description: "Lập trình web là công việc với nhiệm vụ nhận tất cả dữ liệu từ các bộ phận thiết kế và chuyển thành một website hoàn chỉnh",
        image: "https://lamweb.vn/wp-content/uploads/2020/09/lap-trinh-web-la-gi.jpg",
        category: "Kinh tế",
        lecturer: "Nguyễn Văn A",
        price: "200000",
        rateScore: 3.9,
        numberOfRate: 249,
    },
    {
        title: "Tự học guitar",
        description: "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
        image: "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg",
        category: "Kinh tế",
        lecturer: "Nguyễn Văn A",
        price: "200000",
        rateScore: 3.9,
        numberOfRate: 249,
    },
    {
        title: "Nâng cao toán học cho trẻ",
        description: "Những câu đố toán học dành cho trẻ nhỏ giúp rèn luyện khả năng tính toán. Tuy nhiên các bạn nhỏ cần tỉnh táo, chú ý phép nhân chia khiến cho các bạn nhỏ dễ bị nhầm lẫn.",
        image: "https://media-cdn.laodong.vn/Storage/NewsPortal/2020/3/13/790705/Cau-Do-Toan-Hoc0-01.jpg?w=888&h=592&crop=auto&scale=both",
        category: "Kinh tế",
        lecturer: "Nguyễn Văn A",
        price: "200000",
        rateScore: 3.9,
        numberOfRate: 249,
    },
    {
        title: "Lập trình web",
        description: "Lập trình web là công việc với nhiệm vụ nhận tất cả dữ liệu từ các bộ phận thiết kế và chuyển thành một website hoàn chỉnh",
        image: "https://lamweb.vn/wp-content/uploads/2020/09/lap-trinh-web-la-gi.jpg",
        category: "Kinh tế",
        lecturer: "Nguyễn Văn A",
        price: "200000",
        rateScore: 3.9,
        numberOfRate: 249,
    },
]

const CourseListCategory = () => {
    const [courses, setCourses] = useState(top10);
    const category = "Kinh tế"

    return(
        <div className="courseListCategory-container">
            <Divider/>
            <h1 className="title-page">Danh sách khoá học thể loại {category}</h1>
            {
                courses.map((item, index)=>{
                    return(
                        <Row className="list-container">
                            <Col span={8}>
                                <img 
                                    className="image-item" 
                                    alt={item.title} 
                                    src={item.image}
                                />
                            </Col>
                            <Col span={14}>
                                <div className="content-item">
                                    <div><span className="title">Tên:</span>{item.title}</div>
                                    <div><span className="title">Thể Loại:</span>{item.category}</div>
                                    <div><span className="title">Giảng Viên:</span>{item.lecturer}</div>
                                    <div><span className="title">Đánh giá:</span><Rate allowHalf value={item.rateScore} disabled/> {item.numberOfRate} Lượt đánh giá</div>
                                    <div><span className="title">Giá:</span>{item.price} VND</div>
                                </div>
                            </Col>
                        </Row>
                        
                    )
                })
            }
            <br/>
            <Pagination defaultCurrent={1} total={50} />
            <Divider/>
        </div>
    )
}

export default CourseListCategory