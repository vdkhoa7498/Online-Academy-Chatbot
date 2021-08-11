import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { Player } from "video-react";
import ReactPlayer from "react-player";
import {
  PageHeader,
  List,
  Pagination,
  Row,
  Col,
  Space,
  Image,
  Button,
} from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import "video-react/dist/video-react.css";

import { httpClient } from "../../api";
import "./styles.scss";
import ReviewModal from "./components/ReviewModal";

const Learning = ({ user }) => {
  const [videos, setVideos] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [state, setState] = useState();
  const [video, setVideo] = useState({});

  console.log("video", videos);
  const lastTime =
    video.lastWatchTime && user
      ? video.lastWatchTime.find((v) => v.userId === user.id)
      : null;

  const param = useParams();

  useEffect(() => {
    const fetchCourseDetail = async () => {
      const videos = await httpClient.course.getVideoOfCourse(param.id);
      setVideo(videos[0]);
      setVideos(videos);
    };

    fetchCourseDetail();
  }, [param.id]);

  const handleUnload = (e) => {
    var message = "o/";

    (e || window.event).returnValue = message; //Gecko + IE
    return message;
  };

  useEffect(() => {
    const SaveCurrentTime = async () => {
      if (user && video.id && state?.getState().player.currentTime) {
        await httpClient.video.setCurrentTime({
          videoId: video.id,
          userId: user.id,
          currentTime: state?.getState().player.currentTime,
          watchedPercent:
            state?.getState().player.currentTime /
            state?.getState().player.duration,
        });
      }
    };
    window.onbeforeunload = () => {
      handleUnload();
      SaveCurrentTime();
    };
    return function cleanup() {
      SaveCurrentTime();
    };
  }, [state, user, video.id]);
  useEffect(() => {});

  const handleChangeVideo = (video) => {
    setVideo(video);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  if (!user) {
    <Redirect to="/" />;
  }

  if (videos.length === 0) return <div>Fail to load videos</div>;

  return (
    <div>
      <div className="video-header">
        <header className="video-title">{video.title}</header>
        <Button className="review" color="secondary" onClick={showModal}>
          Đánh giá khoá học
        </Button>
      </div>
      <Row className="video">
        <Col span={16}>
          {lastTime && (
            <Player
              ref={(player) => {
                setState(player);
              }}
              fluid={false}
              height={700}
              width={1070}
              playsInline
              poster="./logo_32.png"
              startTime={lastTime.time}
              src={video.url}
            />
          )}
        </Col>
        <Col span={8}>
          <div>
            <List
              size="small"
              bordered
              dataSource={videos}
              renderItem={(item) => (
                <List.Item
                  className="title"
                  onClick={() => handleChangeVideo(item)}
                >
                  {item.title}(
                  {item.lastWatchTime
                    .find((i) => i.userId === user.id)
                    .watchedPercent.toFixed(2) * 100}
                  %)
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>
      <ReviewModal
        visible={visible}
        setVisible={setVisible}
        courseId={param.id}
        onCancel={handleCancel}
      />
    </div>
  );
};
const mapState = (state) => ({
  loading: state.auth.loading,
  user: state.auth.user,
});
const mapDispatch = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapState, mapDispatch)(Learning);
