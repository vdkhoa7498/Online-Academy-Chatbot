import React, { useState, useEffect } from "react";
import { Player } from "video-react";
import {
  Button,
  Table,
  Modal
} from "antd";
import {
  PlusOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";
import { httpClient } from "../../../api";

const { Column } = Table;


const Videos = ({ courseId }) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const watchVideo = (video) => {
    setSelectedVideo(video);
    setIsModalVisible(true);
  };


  const fetchVideos = async () => {
    const videos_ = await httpClient.video.getVideos({
      courseId,
    });
    setVideos(videos_.results);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
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
      <Button
        type="primary"
        style={{ float: "right", margin: 5, width: 200 }}
        icon={<PlusOutlined />}
      >
        Thêm video
      </Button>
      <Table bordered rowKey="id" dataSource={videos} pagination={false}>
        <Column title="ID" dataIndex="id" key="id" align="center" />
        <Column
          title="Tên bài học"
          dataIndex="title"
          key="title"
          align="center"
        />
        <Column
          title="Video"
          dataIndex="shortDescription"
          key="shortDescription"
          align="center"
          render={(text, row) => (
            <Button
              onClick={() => watchVideo(row)}
              icon={<PlaySquareOutlined />}
            >
              Xem Video
            </Button>
          )}
        />
        {/* <Column
            title="Chỉnh sửa"
            key="action"
            align="center"
            render={(text, row) => (
              <Link to={`/lecturer/edit-my-course/${row.id}`}>
                <EditOutlined />
              </Link>
            )}
          />
          <Column
            title="Gỡ bỏ"
            key="action"
            align="center"
            render={(text, row) => (
              <Popconfirm
                title="Bạn có chắc là muốn gỡ bỏ khóa học này không?"
                onConfirm={() => handleDeleteCourse(row)}
                okText="Có"
                cancelText="Không"
              >
                <Button
                  type="danger"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  title="Xoá"
                />
              </Popconfirm>
            )}
          /> */}
      </Table>
    </div>
  );
};

export default Videos
