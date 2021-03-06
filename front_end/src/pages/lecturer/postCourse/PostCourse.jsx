import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
} from "antd";
import {
  PlusOutlined,
  VerticalAlignTopOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Promise } from "bluebird";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory } from "react-router-dom";
import { uploadFile } from "react-s3";
import "./styles.scss";
import { httpClient } from "../../../api";

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

const PostCourse = ({ categories }) => {
  let [form] = Form.useForm();
  const history = useHistory();
  const [isPageLoading, setIsPageLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const [price, setPrice] = useState(0);
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

  const handleUpload = async (files) => {
    return uploadFile(files.file, config);
  };

  const props = {
    name: "videos",
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
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
    let picture = "";
    await handleUpload(values.picture)
      .then((data) => (picture = data.location))
      .catch((err) => console.error(err));

    const course = {
      title: values.title,
      preView: values.preView,
      picture: picture,
      shortDescription: values.shortDescription,
      description: values.description,
      categoryId: values.categoryId,
      status: values.status,
      price: price,
      lecturerId: user.id,
    };
    console.log(course);
    let videos = [];

    await Promise.mapSeries(values.videoList, async (item) => {
      await handleUpload(item.video)
        .then((data) => {
          videos = [...videos, { title: item.videoName, url: data.location }];
        })
        .catch((err) => console.error(err));
    });

    await httpClient.course
      .createCourse(course)
      .then(async (res) => {
        const videoForm = {
          courseId: res.id,
          videoList: videos,
        };
        await httpClient.video
          .createVideos(videoForm)
          .then((res) => {
            message.success("Upload kho?? h???c m???i th??nh c??ng!");
          })
          .catch((err) => {
            console.log(err);
            message.error("Upload b??i videos, vui l??ng th??? l???i sau!");
          });
      })
      .catch((err) => {
        console.log(err);
        message.error("Upload b??i h???c l???i, vui l??ng th??? l???i sau!");
      });
    setIsPageLoading(false);
    history.push("/lecturer/my-courses");
  };

  return (
    <Spin
      spinning={isPageLoading}
      tip="Loading..."
      size="large"
      style={{ textAlign: "center" }}
    >
      <div className="postCourse-container">
        <h1>T???o kho?? h???c m???i</h1>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
        <Divider />
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
              label="Ti??u ?????"
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
              name="picture"
              label="???nh ?????i di???n"
              rules={[
                () => ({
                  validator() {
                    if (pictures.length === 1) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Vui l??ng th??m m???t h??nh ?????i di???n kho?? h???c!"
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
              label="Th??? lo???i"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p ti??u ????? kho?? h???c!",
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
              label="M?? t??? t??m t???t"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p M?? t??? ng???n g???n!",
                  whitespace: true,
                },
              ]}
            >
              <TextArea
                placeholder="M?? t??? ng???n g???n v??? kho?? h???c"
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Chi ti???t kho?? h???c"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p n???i dung chi ti???t kho?? h???c!",
                },
              ]}
              hasFeedback
            >
              <ReactQuill theme="snow" />
            </Form.Item>

            <Form.Item
              label="B??i h???c"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p th??m ??t nh???t m???t video b??i h???c!",
                },
              ]}
            >
              <Form.List
                name="videoList"
                rules={[
                  {
                    validator: async (_, videoList) => {
                      if (!videoList || videoList.length < 1) {
                        return Promise.reject(
                          new Error(
                            "Vui l??ng nh???p th??m ??t nh???t m???t video b??i h???c!"
                          )
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <div
                        key={field.key}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "start",
                          justifyContent: "start",
                          flexDirection: "column",
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, curValues) =>
                            prevValues.area !== curValues.area ||
                            prevValues.sights !== curValues.sights
                          }
                        >
                          {() => (
                            <Form.Item
                              {...field}
                              label="Video Name"
                              name={[field.name, "videoName"]}
                              fieldKey={[field.fieldKey, "videoName"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui l??ng nh???p t??n b??i h???c",
                                },
                              ]}
                            >
                              <Input
                                placeholder="T??n b??i h???c"
                                style={{ width: "100%" }}
                              />
                            </Form.Item>
                          )}
                        </Form.Item>
                        <Form.Item
                          {...field}
                          label="Video"
                          name={[field.name, "video"]}
                          fieldKey={[field.fieldKey, "video"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui l??ng upload video",
                            },
                          ]}
                        >
                          <Upload
                            {...props}
                            accept={
                              ".mp4, .mkv, .mpeg-4, mpeg-2, .avi, .mov, .flv, .wmv, .webm"
                            }
                            beforeUpload={() => false}
                            // listType="picture"
                            // fileList={videos}
                            // onChange={({ fileList }) => {
                            //   setVideos([...videos, fileList]);
                            // }}
                            maxCount={1}
                          >
                            <Button icon={<VerticalAlignTopOutlined />}>
                              Upload Videos
                            </Button>
                          </Upload>
                        </Form.Item>
                        <Button
                          onClick={() => remove(field.name)}
                          style={{
                            marginLeft: 5,
                            marginBottom: 10,
                            color: "red",
                          }}
                          icon={<MinusCircleOutlined />}
                        >
                          Remove video
                        </Button>
                        <Divider />
                      </div>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Th??m b??i h???c
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>

            <Form.Item name="preView" label="S??? video ???????c xem tr?????c" initialValue={0}
            >
              <InputNumber
                style={{
                  width: 200,
                  textAlign: "right",
                }}
                defaultValue="0"
                min="0"
                max="3"
                step="1"
              />
            </Form.Item>

            <Form.Item
              name="status"
              label="Tr???ng th??i"
              initialValue="incomplete"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select style={{ width: 150 }}>
                <Option value="incomplete">Ch??a ho??n th??nh</Option>
                <Option value="complete">Ho??n th??nh</Option>
              </Select>
            </Form.Item>

            <Form.Item name="price" label="Gi?? kho?? h???c">
              <InputNumber
                style={{
                  width: 200,
                  textAlign: "right",
                }}
                defaultValue="0"
                min="0"
                max="100000000"
                step="5000"
                onChange={(value) => setPrice(value)}
              // stringMode
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 10,
                offset: 5,
              }}
            >
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Th??m kho?? h???c
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

export default connect(mapState, mapDispatch)(PostCourse);
