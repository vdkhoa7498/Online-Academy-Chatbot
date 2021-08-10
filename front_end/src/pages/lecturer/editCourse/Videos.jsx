import React, { useState, useEffect } from "react";
import { Player } from "video-react";
import {
  Button,
  Table,
  Modal,
  Upload,
  Form,
  Input,
  message,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  PlaySquareOutlined,
  VerticalAlignTopOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";
import { httpClient } from "../../../api";
import AWS from "aws-sdk";

const { Column } = Table;

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_REGION;
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
const BASE_S3_LINK = process.env.REACT_APP_PUBLIC_LINK_S3;

const Videos = ({ courseId }) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  const [editForm] = Form.useForm();
  const watchVideo = (video) => {
    setSelectedVideo(video);
    setIsModalVisible(true);
  };

  const props = {
    customRequest({
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials,
    }) {
      AWS.config.update({
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
      });

      const S3 = new AWS.S3();
      console.log("DEBUG filename", file.name);
      console.log("DEBUG file type", file.type);

      const objParams = {
        Bucket: S3_BUCKET,
        Key: Date.now() + "-" + file.name,
        Body: file,
        ContentType: file.type, // TODO: You should set content-type because AWS SDK will not automatically set file MIME
        ACL: "public-read",
      };

      S3.putObject(objParams)
        .on("httpUploadProgress", function ({ loaded, total }) {
          onProgress(
            {
              percent: Math.round((loaded / total) * 100),
            },
            file
          );
        })
        .send(function (err, data) {
          if (err) {
            onError();
            console.log("Something went wrong");
            console.log(err.code);
            console.log(err.message);
          } else {
            onSuccess(data, file);
            setVideoLink(`${BASE_S3_LINK}${objParams.Key}`);
            console.log(videoLink);
            console.log("SEND FINISHED");
          }
        });
    },
  };

  const fetchVideos = async () => {
    const videos_ = await httpClient.video.getVideos({
      courseId,
    });
    setVideos(videos_.results);
  };

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const onEditVideo = (values) => {
    console.log(values, "edit");
  };

  const onCreateVideo = async ({ title }) => {
    const videoForm = {
      courseId,
      videoList: [{ title, url: videoLink }],
    };
    await httpClient.video
      .createVideos(videoForm)
      .then((res) => {
        message.success("Upload khoá học mới thành công!");
        setIsCreateModalVisible(false);
        fetchVideos();
      })
      .catch((err) => {
        console.log(err);
        message.error("Upload bài video, vui lòng thử lại sau!");
      });
  };

  const handleDeleteCourse = async ({ id }) => {
    await httpClient.video.deleteVideo(id);
    fetchVideos();
  };

  return (
    <div>
      <Modal
        title="Thêm video mới"
        visible={isCreateModalVisible}
        onCancel={() => {
          setIsCreateModalVisible(false);
        }}
        footer={[
          <Button
            type="primary"
            form="createForm"
            key="submit"
            htmlType="submit"
            icon={<PlusOutlined />}
          >
            Thêm video
          </Button>,
        ]}
        width={"40%"}
      >
        <Form
          id="createForm"
          onFinish={onCreateVideo}
          className="post-course-form"
          form={editForm}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
            offset: 1,
          }}
        >
          <Form.Item
            name="title"
            label="Tên bài học"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tiêu đề khoá học!",
                whitespace: false,
              },
            ]}
          >
            <Input placeholder="Tên bài học" />
          </Form.Item>
          <Form.Item
            name="video"
            label="Video"
            rules={[
              {
                required: true,
                message: "Vui lòng upload video!",
              },
            ]}
          >
            <Upload
              accept={
                ".mp4, .mkv, .mpeg-4, mpeg-2, .avi, .mov, .flv, .wmv, .webm"
              }
              maxCount={1}
              {...props}
            >
              <Button icon={<VerticalAlignTopOutlined />}>Upload video</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Chỉnh sửa video"
        visible={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
        }}
      >
        <Form
          onFinish={onEditVideo}
          className="post-course-form"
          form={editForm}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
            offset: 1,
          }}
        >
          <Form.Item
            name="title"
            label="Tên bài học"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tiêu đề khoá học!",
                whitespace: false,
              },
            ]}
          >
            <Input placeholder="Tiêu đề" />
          </Form.Item>
          <Form.Item
            name="video"
            label="Tiêu đề"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tiêu đề khoá học!",
                whitespace: false,
              },
            ]}
          >
            <Upload
              accept={
                ".mp4, .mkv, .mpeg-4, mpeg-2, .avi, .mov, .flv, .wmv, .webm"
              }
              maxCount={1}
              {...props}
            >
              Upload videos
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
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
        onClick={showCreateModal}
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
        <Column
          title="Gỡ bỏ"
          key="action"
          align="center"
          render={(text, row) => (
            <Popconfirm
              title="Bạn có chắc là muốn xoá video này không?"
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
        />
      </Table>
    </div>
  );
};

export default Videos;
