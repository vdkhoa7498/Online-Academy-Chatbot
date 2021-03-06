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
        message.success("Th??m video m???i th??nh c??ng!");
        setIsCreateModalVisible(false);
        fetchVideos();
      })
      .catch((err) => {
        console.log(err);
        message.error("Upload video l???i, vui l??ng th??? l???i sau!");
      });
  };

  const handleDeleteCourse = async ({ id }) => {
    await httpClient.video.deleteVideo(id).then((res) => {
      message.success("Xo?? video th??nh c??ng!");
      setIsCreateModalVisible(false);
      fetchVideos();
    })
    .catch((err) => {
      console.log(err);
      message.error("Xo?? video l???i, vui l??ng th??? l???i sau!");
    });
    fetchVideos();
  };

  return (
    <div>
      <Modal
        title="Th??m video m???i"
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
            Th??m video
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
            label="T??n b??i h???c"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p ti??u ????? kho?? h???c!",
                whitespace: false,
              },
            ]}
          >
            <Input placeholder="T??n b??i h???c" />
          </Form.Item>
          <Form.Item
            name="video"
            label="Video"
            rules={[
              {
                required: true,
                message: "Vui l??ng upload video!",
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
        title="Ch???nh s???a video"
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
            label="T??n b??i h???c"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p ti??u ????? kho?? h???c!",
                whitespace: false,
              },
            ]}
          >
            <Input placeholder="Ti??u ?????" />
          </Form.Item>
          <Form.Item
            name="video"
            label="Ti??u ?????"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p ti??u ????? kho?? h???c!",
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
        Th??m video
      </Button>
      <Table bordered rowKey="id" dataSource={videos} pagination={false}>
        <Column title="ID" dataIndex="id" key="id" align="center" />
        <Column
          title="T??n b??i h???c"
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
          title="G??? b???"
          key="action"
          align="center"
          render={(text, row) => (
            <Popconfirm
              title="B???n c?? ch???c l?? mu???n xo?? video n??y kh??ng?"
              onConfirm={() => handleDeleteCourse(row)}
              okText="C??"
              cancelText="Kh??ng"
            >
              <Button
                type="danger"
                shape="circle"
                icon={<DeleteOutlined />}
                title="Xo??"
              />
            </Popconfirm>
          )}
        />
      </Table>
    </div>
  );
};

export default Videos;
