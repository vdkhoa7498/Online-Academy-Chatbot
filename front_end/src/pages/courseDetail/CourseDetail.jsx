import React, { useState, useEffect } from "react";
import {
  Rate,
  Comment,
  Tooltip,
  Avatar,
  Divider,
  List,
  Pagination,
  Row,
  Col,
  Space,
  Image,
  Button,
} from "antd";
import moment from "moment";
import {
  TeamOutlined,
  CalendarOutlined,
  PlayCircleOutlined,
  VideoCameraOutlined,
  StarFilled,
  EditFilled,
  PlayCircleFilled,
  HeartOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Markup } from "interweave";

import "./styles.scss";
import { httpClient } from "../../api";

const courseEx = {
  title: "Tự học guitar",
  short_description:
    "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
  description:
    "Tập đánh đàn bằng cả hai tay là một trong những bước quan trọng dành cho những bạn học đánh đàn guitar cơ bản. Sẽ giúp bạn biết cách cầm phím ra sao và ngón tay bấm như thế nào, đồng thời phối hợp được nhịp nhàng giữa 2 tay. Ngoài ra, ở tuần đầu tiên luyện tập, các ngón tay trái của bạn sẽ bị đau. Tuy nhiên, nếu cố gắng luyện tập một thời gian, bạn sẽ dễ dàng làm quen và không còn đau nữa.",
  image:
    "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg",
  rateScore: 3.5,
  ratings: 249,
  studentNumber: 341,
  lastUpdate: "7/2021",

  lectures: [
    {
      name: "Bài 1",
      length: "15:00",
    },
    {
      name: "Bài 2",
      length: "15:00",
    },
    {
      name: "Bài 2",
      length: "15:00",
    },
  ],

  otherCourses: [
    {
      title: "Tự học guitar",
      short_description:
        "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
      image:
        "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg",
      rateScore: 3.5,
      studentNumber: 341,
    },
    {
      title: "Tự học guitar",
      short_description:
        "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
      image:
        "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg",
      rateScore: 3.5,
      studentNumber: 341,
    },
    {
      title: "Tự học guitar",
      short_description:
        "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
      image:
        "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg",
      rateScore: 3.5,
      studentNumber: 341,
    },
    {
      title: "Tự học guitar",
      short_description:
        "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
      image:
        "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg",
      rateScore: 3.5,
      studentNumber: 341,
    },
    {
      title: "Tự học guitar",
      short_description:
        "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
      image:
        "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg",
      rateScore: 3.5,
      studentNumber: 341,
    },
  ],

  lecturer: {
    name: "Nguyễn Mạnh Linh",
    company: "Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus iusto adipisci ratione commodi deleniti in modi, ipsa perferendis fugiat reiciendis dignissimos eos distinctio perspiciatis aut nisi fuga nihil nam delectus.",
    avatar:
      "https://ik.imagekit.io/5tq70vhft/cropped756619698302919104_tQbaIrNm0.jpg",
    averageRating: 4.5,
    totalReviews: 100000,
    totalStudents: 2000000,
    totalCourses: 10,
  },

  rates: [
    {
      user: {
        id: 0,
        avatar:
          "https://i.pinimg.com/originals/eb/b0/2a/ebb02aedec9bc74f65e38311c7e14d34.png",
        name: "abc",
      },
      content: "Hay qua!",
      rateScore: 5,
      createdAt: 1621611357961,
    },
    {
      user: {
        id: 1,
        avatar:
          "https://i.pinimg.com/originals/eb/b0/2a/ebb02aedec9bc74f65e38311c7e14d34.png",
        name: "Vivi",
      },
      content: "Hay qua!",
      rateScore: 4,
      createdAt: 1621611343961,
    },
    {
      user: {
        id: 1,
        avatar:
          "https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg",
        name: "Khung long con",
      },
      content: "So so",
      rateScore: 3,
      createdAt: 1621611351261,
    },
  ],
};

const CourseDetail = ({ user }) => {
  const [course, setCourse] = useState({});
  const [isLike, setIsLike] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const param = useParams();

  useEffect(() => {
    const fetchCourseDetail = async () => {
      const course = await httpClient.course.getCourseById(param.id);
      console.log(course);
      setCourse(course);
    };

    const fetchUserCourseInfo = async () => {
      try {
        const result = await httpClient.user.getInfoCourse(param.id);
        setIsLike(result.isLike);
        setIsRegister(result.isRegister);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchCourseDetail();

    if (user) fetchUserCourseInfo();
  }, [param.id, user]);

  useEffect(() => {
    const addView = async () => {
      await httpClient.course.addView({
        courseId: param.id,
      });
    };
    addView();
  }, []);

  const handleRegisterCourse = async () => {
    await httpClient.user
      .registerCourse(course._id)
      .catch((error) => console.log("Fail to register course"));
    setIsRegister(true);
  };

  const handAddtoFavoriteList = async () => {
    await httpClient.user
      .addToFavorite(course._id)
      .catch((error) => console.log("Fail to add to favorite course"));
    setIsLike(true);
  };

  const handleDislikeCourse = async () => {
    try {
      await httpClient.user.removeFavoriteCourse(course._id);
      setIsLike(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleUnRegisterCourses = async (id) => {
    try {
      await httpClient.user.removeRegisterCourse(course._id);
      setIsRegister(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  if (!course) return <div>loading</div>;

  return (
    <div className="course-detail-container">
      <Row className="course-content">
        <Col span={16}>
          <h1 style={{ fontWeight: "bold", marginTop: 15, fontSize: 30 }}>
            {course.title}
          </h1>
          <div style={{ fontWeight: "bold", marginTop: 10, marginBottom: 5 }}>
            {course.shortDescription}
          </div>
          <Markup content={course?.description?.replaceAll("&lt;", "<")} />
          <div>
            {course.rateScore}{" "}
            <Rate allowHalf value={course.rateScore} disabled /> (
            {course.ratings} đánh giá){" "}
            <TeamOutlined className="student-number" /> {course.countStudents}{" "}
            học viên
          </div>
          <div>
            <CalendarOutlined /> Cập nhật lần cuối:{" "}
            {new Date(course.updatedAt).toUTCString()}
          </div>
          <div style={{ marginTop: "20px" }}>
            <Space>
              {user && (
                <div>
                  {!isRegister ? (
                    <Button
                      type="primary"
                      icon={<FormOutlined />}
                      onClick={handleRegisterCourse}
                    >
                      Tham gia
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      icon={<FormOutlined />}
                      onClick={handleUnRegisterCourses}
                    >
                      Huỷ tham gia
                    </Button>
                  )}
                  {!isLike ? (
                    <Button
                      icon={<HeartOutlined />}
                      onClick={handAddtoFavoriteList}
                    >
                      Yêu thích
                    </Button>
                  ) : (
                    <Button
                      icon={<HeartOutlined />}
                      onClick={handleDislikeCourse}
                    >
                      Huỷ yêu thích
                    </Button>
                  )}

                  {isRegister && user && (
                    <div className="learing">
                      <Link to={`/courses/learning/${param.id}`}>
                        <VideoCameraOutlined /> Học ngay
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </Space>
          </div>
        </Col>
        <Col span={8}>
          <img className="img-item" alt={course.title} src={course.picture} />
        </Col>
      </Row>

      <Divider orientation="left">
        <div className="section">Đề cương khóa học</div>
      </Divider>
      <List
        size="large"
        itemLayout="horizontal"
        dataSource={course.lectures}
        renderItem={(item) => (
          <List.Item className="lecture-item">
            <div>
              <Space>
                <PlayCircleOutlined />
                <b>{item.title}</b>
              </Space>
            </div>
            <div>
              <Space size="large">
                <a href="#">Xem trước</a>
                {item.length}
              </Space>
            </div>
          </List.Item>
        )}
      />

      <Divider orientation="left">
        <div className="section">Các khóa học khác</div>
      </Divider>
      <List
        itemLayout="horizontal"
        dataSource={course.otherCourses}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar shape="square" size={64} src={item.picture} />}
              title={<a href="#">{item.title}</a>}
              description={item.shortDescription}
            />
            <div>
              <Rate allowHalf value={item.rateScore} disabled />
            </div>
            <div>
              <TeamOutlined className="student-number" /> {course.studentNumber}
            </div>
          </List.Item>
        )}
      />

      <Divider orientation="left">
        <div className="section">Thông tin giảng viên</div>
      </Divider>
      { course.lecturerInfo && <div style={{ fontWeight: 'bold', fontSize: 18, color: 'purple', marginTop: '20px' }}>{course.lecturerInfo.fullName}</div> }
      {/* <div style={{ fontWeight: 'bold', fontSize: 18, color: 'purple', marginTop: '20px' }}>{course.lecturer.name}</div> */}
      {/* <div>{course.lecturer.company}</div> */}
      <Row>
        <Col span={3}>
          {/* <img style={{ borderRadius: '50%', width: '100%', padding: '10px' }} src={course.lecturer.avatar} /> */}
        </Col>
        <Col span={21}>
          <Row>
            <Space>
              <StarFilled />
              {/* {course.lecturer.averageRating} */}
              Đánh giá trung bình
            </Space>
          </Row>
          <Row>
            <Space>
              <EditFilled />
              {/* {course.lecturer.averageRating} */}
              Đánh giá
            </Space>
          </Row>
          <Row>
            <Space>
              <TeamOutlined />
              {/* {course.lecturer.totalStudents} */}
              Học viên
            </Space>
          </Row>
          <Row>
            <Space>
              <PlayCircleFilled />
              {/* {course.lecturer.totalCourses} */}
              Khóa học
            </Space>
          </Row>
          <Row>{/* {course.lecturer.description} */}</Row>
        </Col>
      </Row>

      <Divider orientation="center">
        <div className="section">
          Đánh giá của học viên
          <span style={{ fontSize: 24 }}>
            {" "}
            ({course.ratings} đánh giá)
          </span>
        </div>
      </Divider>
      <List
        className="comment-list"
        itemLayout="horizontal"
        dataSource={course.rates}
        renderItem={(item) => (
          <li>
            <Comment
              author={<b style={{ color: "black" }}>{item.user[0].fullName}</b>}
              avatar={<Avatar src={item.user.avatar} alt={course.title} />}
              content={
                <div>
                  <Rate allowHalf value={item.point} disabled />
                  <p>{item.content}</p>
                </div>
              }
              datetime={
                <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                  <span style={{ color: "gray" }}>
                    {moment(item.createdAt).fromNow()}
                  </span>
                </Tooltip>
              }
            />
          </li>
        )}
      />
      <br />
      {/* <Pagination defaultCurrent={1} total={50} /> */}
      <Divider />
    </div>
  );
};

const mapState = (state) => ({
  loading: state.auth.loading,
  user: state.auth.user,
});
const mapDispatch = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapState, mapDispatch)(CourseDetail);
