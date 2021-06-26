import React, {useState} from 'react'
import { Rate, Comment, Tooltip, Avatar, Divider, List, Pagination, Row, Col, Space } from 'antd'
import moment from 'moment';
import { TeamOutlined, CalendarOutlined, PlayCircleOutlined } from '@ant-design/icons'
import './styles.scss'
import {useParams} from 'react-router-dom'

const courseEx = {
    title: "Tự học guitar",
    short_description: "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
    description: "Tập đánh đàn bằng cả hai tay là một trong những bước quan trọng dành cho những bạn học đánh đàn guitar cơ bản. Sẽ giúp bạn biết cách cầm phím ra sao và ngón tay bấm như thế nào, đồng thời phối hợp được nhịp nhàng giữa 2 tay. Ngoài ra, ở tuần đầu tiên luyện tập, các ngón tay trái của bạn sẽ bị đau. Tuy nhiên, nếu cố gắng luyện tập một thời gian, bạn sẽ dễ dàng làm quen và không còn đau nữa.",
    image: "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg",
    rateScore: 3.5,
    ratings: 249,
    studentNumber: 341,
    lastUpdate: "7/2021",

    lectures: [
        {
            name: "Bài 1",
            length: '15:00'
        },
        {
            name: "Bài 2",
            length: '15:00'
        },
        {
            name: "Bài 2",
            length: '15:00'
        }
    ],

    otherCourses: [
        {
            title: "Tự học guitar",
            short_description: "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
            image: "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg",
            rateScore: 3.5,
            studentNumber: 341,
        },
        {
            title: "Tự học guitar",
            short_description: "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
            image: "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg",
            rateScore: 3.5,
            studentNumber: 341,
        },
        {
            title: "Tự học guitar",
            short_description: "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
            image: "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg",
            rateScore: 3.5,
            studentNumber: 341,
        },
        {
            title: "Tự học guitar",
            short_description: "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
            image: "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg",
            rateScore: 3.5,
            studentNumber: 341,
        },
        {
            title: "Tự học guitar",
            short_description: "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
            image: "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg",
            rateScore: 3.5,
            studentNumber: 341,
        },
    ],

    rates: [
        {
            user:{
                id: 0,
                avatar: "https://i.pinimg.com/originals/eb/b0/2a/ebb02aedec9bc74f65e38311c7e14d34.png",
                name: "abc"
            },
            content: "Hay qua!",
            rateScore: 5,
            createdAt: 1621611357961
        },
        {
            user:{
                id: 1,
                avatar: "https://i.pinimg.com/originals/eb/b0/2a/ebb02aedec9bc74f65e38311c7e14d34.png",
                name: "Vivi"
            },
            content: "Hay qua!",
            rateScore: 4,
            createdAt: 1621611343961
        },
        {
            user:{
                id: 1,
                avatar: "https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg",
                name: "Khung long con"
            },
            content: "So so",
            rateScore: 3,
            createdAt: 1621611351261
        }
    ]
}

const CourseDetail = () => {
    const [course, setCourse] = useState(courseEx)

    const param = useParams()
    console.log(Date.now())

    return(
        <div className="course-detail-container">
            <img className='img-item' alt={course.title} src={course.image}/>

            <h1 style={{fontWeight: 'bold', marginTop: 15, fontSize: 30}}>{course.title}</h1>
            <div style={{fontWeight: 'bold', marginTop: 10, marginBottom: 5}}>{course.short_description}</div>
            <div>{course.description}</div>
            <div>
                {course.rateScore} <Rate allowHalf value={course.rateScore} disabled/> ({course.ratings} đánh giá) <TeamOutlined className="student-number" /> {course.studentNumber} học viên
            </div>
            <div>
                <CalendarOutlined/> Cập nhật lần cuối: {course.lastUpdate}
            </div>

            <Divider/>

            <List
                size="large"
                header={<div style={{fontWeight: 'bold', fontSize: 24}}>Đề cương khóa học</div>}
                itemLayout="horizontal"
                dataSource={courseEx.lectures}
                renderItem={item => (
                    <List.Item>
                        <div>
                            <Space>
                                <PlayCircleOutlined />
                                <b>{item.name}</b>
                            </Space>
                        </div>
                        <div>
                            <Space size='large'>
                                <a href='#'>Xem trước</a>
                                {item.length}
                            </Space>
                        </div>
                    </List.Item>
                )}
            />

            <Divider/>

            <List
                header={<div style={{fontWeight: 'bold', fontSize: 24}}>Các khóa học khác</div>}
                itemLayout="horizontal"
                dataSource={courseEx.otherCourses}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar shape="square" size={64} src={item.image}/>}
                            title={<a href="#">{item.title}</a>}
                            description={item.short_description}
                        />
                        <div>
                            <Rate allowHalf value={item.rateScore} disabled/>
                        </div>
                        <div>
                            <TeamOutlined className="student-number" /> {course.studentNumber}
                        </div>
                    </List.Item>
                )}
            />

            <Divider/>

            <List
                className="comment-list"
                header={<div style={{fontWeight: 'bold', fontSize: 24}}>Đánh giá  <span style={{fontSize: 16}}> ({courseEx.rates.length} đánh giá)</span></div>}
                itemLayout="horizontal"
                dataSource={courseEx.rates}
                renderItem={item => (
                <li>
                    <Comment
                        author={<b style={{color: 'black'}}>{item.user.name}</b>}
                        avatar={
                            <Avatar
                            
                            src= {item.user.avatar}
                            alt= {courseEx.title}
                            />
                        }
                        content={
                            <div>
                                <Rate allowHalf value={item.rateScore} disabled/>
                                <p>{item.content}</p>
                            </div>
                            
                        }
                        datetime={
                            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                <span style={{color: 'gray'}}>{moment(item.createdAt).fromNow()}</span>
                            </Tooltip>
                        }
                    />
                </li>
                )}
            />
            <br/>
            <Pagination defaultCurrent={1} total={50} />
            <Divider/>
        </div>
    )
}

export default CourseDetail