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
  Modal
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

  const [isPreviewModalVisible, setPreviewModalVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const showPreViewModal = (url) => {
    setPreviewUrl(url);
    setPreviewModalVisible(true);
  };
  const handlePreviewCancel = () => {
    setPreviewModalVisible(false);
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
              {user && user?.role === "student" &&(
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

                  {isRegister && user && user?.role === "student" &&(
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
        renderItem={(item, index) => (
          <List.Item className="lecture-item">
            <div>
              <Space>
                <PlayCircleOutlined />
                <b>{item.title}</b>
              </Space>
            </div>
            <div>
              <Space size="large">
                {index < course.preView && <Button type="link" onClick={() => showPreViewModal(item.url)}>Xem trước</Button>}
                {item.length}
              </Space>
            </div>
          </List.Item>
        )}
      />
      <Modal title='Xem trước' width='50%' visible={isPreviewModalVisible} onCancel={handlePreviewCancel} footer={null}>
        <video width='100%' controls>
          <source src={previewUrl} />
        </video>
      </Modal>

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
              title={<a href={"/courses/" + item._id}>{item.title}</a>}
              description={item.shortDescription}
            />
            {/* <div>
              <Rate allowHalf value={item.rateScore} disabled />
            </div>
            <div>
              <TeamOutlined className="student-number" /> {course.studentNumber}
            </div> */}
          </List.Item>
        )}
      />

      <Divider orientation="left">
        <div className="section">Thông tin giảng viên</div>
      </Divider>
      {course.lecturerDetails && <div style={{ fontWeight: 'bold', fontSize: 18, color: 'purple', marginTop: '20px' }}>{course.lecturerDetails.fullName}</div>}
      <Row>
        <Col span={3}>
          {/* <img style={{ borderRadius: '50%', width: '100%', padding: '10px' }} src={course.lecturer.avatar} /> */}
        </Col>
        <Col span={21}>
          <Row>
            <Space>
              <StarFilled />
              {course.lecturerDetails && course.lecturerDetails.rateScore}
              Đánh giá trung bình
            </Space>
          </Row>
          <Row>
            <Space>
              <EditFilled />
              {course.lecturerDetails && course.lecturerDetails.ratings}
              Đánh giá
            </Space>
          </Row>
          <Row>
            <Space>
              <TeamOutlined />
              {course.lecturerDetails && course.lecturerDetails.countStudents}
              Học viên
            </Space>
          </Row>
          <Row>
            <Space>
              <PlayCircleFilled />
              {course.lecturerDetails && course.lecturerDetails.countCourses}
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
              avatar={<Avatar size={64}>{defaultAvatar(item.user[0].fullName)}</Avatar>}
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

const defaultAvatar = (fullName) => {
  var segments = fullName.split(' ');
  var result = '';
  segments.forEach(segment => {
    result += segment[0];
  })
  return result;
}