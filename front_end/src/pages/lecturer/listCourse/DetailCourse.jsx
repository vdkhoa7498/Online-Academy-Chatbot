import React, { useState, useEffect } from "react";
import { Modal, Button, Divider, Row, Col, Drawer, Rate } from "antd";
import { PlaySquareOutlined } from "@ant-design/icons";
import { Markup } from "interweave";
import { Player } from "video-react";
import { httpClient } from "../../../api";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./styles.scss";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">
      <strong>{title}:</strong>
    </p>
    {content}
  </div>
);

const DetailCourse = (props) => {
  const { categories, visible, onClose, selectedCourse } = props;
  const user = JSON.parse(localStorage.getItem("user"));
  let categoryNameList = [];
  categories.map((item) => {
    categoryNameList[item._id] = item.name;
  });
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const watchVideo = (video) => {
    setSelectedVideo(video);
    setIsModalVisible(true);
  };

  const fetchData = async () => {
    const videos_ = await httpClient.video.getVideos({
      courseId: selectedCourse.id,
    });
    setVideos(videos_.results);
  };
  useEffect(() => {
    fetchData();
  }, [selectedCourse]);

  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <Modal
        title={selectedVideo.title}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        footer={null}
        width={750}
      >
        <Player
          fluid={false}
          height={400}
          width={711}
          playsInline
          poster="./logo_32.png"
          src={selectedVideo.url}
        />
      </Modal>
      <p
        className="site-description-item-profile-p"
        style={{ marginBottom: 24, fontWeight: "bold" }}
      >
        Chi ti???t kho?? h???c
      </p>
      {/* <p className="site-description-item-profile-p">Personal</p> */}
      <Row>
        <Col span={24}>
          <DescriptionItem title="T???a ?????" content={selectedCourse?.title} />
        </Col>
        <Col span={24}>
          <DescriptionItem
            title="T??m t???t"
            content={selectedCourse?.shortDescription}
          />
        </Col>
        <Col span={24}>
          <DescriptionItem
            title="Chi ti???t"
            content={
              <Markup
                content={selectedCourse?.description?.replaceAll("&lt;", "<")}
              />
            }
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Danh m???c"
            content={categoryNameList[selectedCourse.categoryId]}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Gi???ng vi??n" content={user?.fullName} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title="L?????t xem" content={selectedCourse.view} />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="S??? l?????ng h???c vi??n"
            content={selectedCourse.studentNumber}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="????nh gi??"
            content={
              <Rate allowHalf value={selectedCourse.rateScore} disabled />
            }
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="L?????t ????nh gi??"
            content={selectedCourse.view}
          />
        </Col>
      </Row>
      <Divider />
      <p className="site-description-item-profile-p">Videos</p>
      <Row>
        {videos.map((video, index) => (
          <Col span={24} key={index}>
            <DescriptionItem
              title={video.title}
              content={
                <Button
                  onClick={() => watchVideo(video)}
                  icon={<PlaySquareOutlined />}
                >
                  Xem Video
                </Button>
              }
            />
          </Col>
        ))}
      </Row>
    </Drawer>
  );
};

const mapState = (state) => ({
  categories: state.category.categories,
});
const mapDispatch = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapState, mapDispatch)(DetailCourse);
