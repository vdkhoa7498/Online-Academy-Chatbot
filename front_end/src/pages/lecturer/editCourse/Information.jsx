import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Markup } from "interweave";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Divider,
  Select,
  Modal,
  InputNumber,
  Spin,
  Tabs,
  Table,
} from "antd";
import {
  PlusOutlined,
  VerticalAlignTopOutlined,
  MinusCircleOutlined,
  EditOutlined,
  PlaySquareOutlined,
  PicLeftOutlined,
} from "@ant-design/icons";
import { Promise } from "bluebird";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory, useParams } from "react-router-dom";
import { uploadFile } from "react-s3";
import { httpClient } from "../../../api";
import AWS from "aws-sdk";

const { TextArea } = Input;
const { Option, OptGroup } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const Information = ({ categories }) => {
  let [form] = Form.useForm();
  const history = useHistory();
  const [isPageLoading, setIsPageLoading] = useState(false);
  const courseId = useParams().courseId;
  const user = JSON.parse(localStorage.getItem("user"));

  const [course, setCourse] = useState({});
  const [videos, setVideos] = useState([]);
  const [pictures, setPictures] = useState([]);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const parentCategories = categories.filter((category) => {
    return !category.parentId;
  });
  const childrenCategories = categories.filter((category) => {
    return !!category.parentId;
  });

  const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
  const REGION = process.env.REACT_APP_REGION;
  const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
  const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;

  const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  };

  const customRequest = ({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials,
  }) => {
    AWS.config.update({
      ...config,
    });

    const S3 = new AWS.S3();
    console.log("DEBUG filename", file.name);
    console.log("DEBUG file type", file.type);

    const objParams = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
      ContentType: file.type, // TODO: You should set content-type because AWS SDK will not automatically set file MIME
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
          onSuccess(data.response, file);
          console.log("SEND FINISHED");
        }
      });
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
  };

  const handleChange = ({ fileList }) => setPictures(fileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onFinish = async (values) => {
    setIsPageLoading(true);

    setIsPageLoading(false);
    history.push("/");
  };

  const fetchCourse = async () => {
    const course_ = await httpClient.course.getCourseById(courseId);
    setCourse(course_);
    console.log(course);
  };

  const fillCurrentForm = () => {
    const description_ = course?.description?.replaceAll("&lt;", "<");
    form.setFieldsValue({
      title: course.title,
      picture: {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      shortDescription: course.shortDescription,
      categoryId: course.categoryId,
      status: course.status,
      price: course.price
      // description: description_
    });
  };
  useEffect(() => {
    fetchCourse();
    fillCurrentForm();
  }, [courseId]);

  return (
    <Spin
      spinning={isPageLoading}
      tip="Loading..."
      size="large"
      style={{ textAlign: "center" }}
    >
      <div className="postCourse-container">
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
        {!categories ? null : (
          <Form
            onFinish={onFinish}
            className="post-course-form"
            form={form}
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
              label="Tiêu đề"
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
              name="picture"
              label="Ảnh đại diện"
              rules={[
                () => ({
                  validator() {
                    if (pictures.length === 1) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Vui lòng thêm một hình đại diện khoá học!"
                    );
                  },
                }),
              ]}
            >
              <Upload
                listType="picture-card"
                fileList={pictures}
                accept={".jpg, .png, jpeg"}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false}
              >
                {pictures.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item
              name="categoryId"
              label="Thể loại"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tiêu đề khoá học!",
                  whitespace: false,
                },
              ]}
            >
              <Select style={{ width: 200 }}>
                {parentCategories.map((item, index) => {
                  if (
                    childrenCategories.findIndex(
                      (value) => value.parentId == item._id
                    ) === -1
                  ) {
                    return (
                      <Option key={`category ${index}`} value={item._id}>
                        {item.name}
                      </Option>
                    );
                  } else {
                    return (
                      <OptGroup key={`category ${index}`} label={item.name}>
                        {childrenCategories.map((child, childIndex) => {
                          if (child.parentId === item._id) {
                            return (
                              <Option
                                key={`category child ${childIndex}`}
                                value={child._id}
                              >
                                {child.name}
                              </Option>
                            );
                          }
                        })}
                      </OptGroup>
                    );
                  }
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="shortDescription"
              label="Mô tả tóm tắt"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Mô tả ngắn gọn!",
                  whitespace: true,
                },
              ]}
            >
              <TextArea
                placeholder="Mô tả ngắn gọn về khoá học"
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Chi tiết khoá học"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập nội dung chi tiết khoá học!",
                },
              ]}
              hasFeedback
              initialValue={<strong>abc</strong>}
            >
              <ReactQuill theme="snow" />
            </Form.Item>
            <Form.Item
              name="status"
              label="Trạng thái"
              initialValue="incomplete"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select style={{ width: 150 }}>
                <Option value="incomplete">Chưa hoàn thành</Option>
                <Option value="complete">Hoàn thành</Option>
              </Select>
            </Form.Item>

            <Form.Item name="price" label="Giá khoá học" initialValue={0}>
              <InputNumber
                style={{
                  width: 200,
                  textAlign: "right",
                }}
                min="0"
                max="100000000"
                step="5000"
                // stringMode
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 10,
                offset: 5,
              }}
            >
              <Button type="primary" htmlType="submit" icon={<EditOutlined />}>
                Chỉnh sửa khoá học
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </Spin>
  );
};

const mapState = (state) => ({
  categories: state.category.categories,
});
const mapDispatch = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapState, mapDispatch)(Information);
