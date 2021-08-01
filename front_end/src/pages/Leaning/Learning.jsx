import React, { useState, useEffect} from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { Player } from 'video-react';
import ReactPlayer from 'react-player'
import {  PageHeader, List, Pagination, Row, Col, Space, Image, Button } from 'antd'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import "video-react/dist/video-react.css"; 

import { httpClient } from '../../api'
import './styles.scss';
import ReviewModal from './components/ReviewModal';


 const  Learning = ({user}) => {
  const [videos, setVideos] = useState([])
  const [visible, setVisible] = React.useState(false);

  const [video, setVideo] = useState({});

  const param = useParams()

  useEffect(() => {
    const fetchCourseDetail = async () => {
        const videos = await httpClient.course.getVideoOfCourse(param.id);
        setVideo(videos[0]);
        setVideos(videos);
    }

    fetchCourseDetail();
  },[param.id])

  const handleChangeVideo = (video) => {
      setVideo(video);
    
  }

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  

  if (!user){
    <Redirect to="/"/>
  }

  if (videos.length === 0)
    return <div>Fail to load videos</div>

  return (
    <div>
      <div className="video-header">
      {/* <PageHeader
          className="site-page-header"
          title={video.title}
        /> */}
        <header className="video-title">{video.title}</header>
      <Button className="review" color="secondary" onClick={showModal}>Đánh giá khoá học</Button>

      </div>
      <Row className="video">
        <Col span={16}>
          <Player
          fluid={false}
          height={700}
          width={1070}
          playsInline
          poster="./logo_32.png"
          src={video.url}
        />
        </ Col>
        <Col span={8}>
          <div>  
            <List
              size="small"
              bordered
              dataSource={videos}
              renderItem={item => <List.Item className="title" onClick={() => handleChangeVideo(item)}>{item.title}</List.Item>}
            />
          </div>
        </Col>
      </Row>
      <ReviewModal visible={visible} setVisible={setVisible} courseId={param.id} onCancel={handleCancel} />
    </div>
  )
}
const mapState = (state) => ({
  loading: state.auth.loading,
  user: state.auth.user,
});
const mapDispatch = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch
  );
export default connect(mapState, mapDispatch)(Learning);