import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Select,
  Modal,
  InputNumber,
  Spin,
} from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Promise } from "bluebird";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory } from "react-router-dom";
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

const Information = ({ categories, courseId, course }) => {
  let [form] = Form.useForm();
  const history = useHistory();
  const [isPageLoading, setIsPageLoading] = useState(false);

  const [pictureLink, setPictureLink] = useState("");
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
  const BASE_S3_LINK = process.env.REACT_APP_PUBLIC_LINK_S3;

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
            setPictureLink(`${BASE_S3_LINK}${objParams.Key}`);
            console.log("SEND FINISHED");
          }
        });
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

  const onFinish = async (form) => {
    setIsPageLoading(true);
    form.picture = pictureLink;

    const result = await httpClient.course.updateCourseById(courseId, form);
    console.log(result);
    setIsPageLoading(false);
    if (result){
      message.success("Thay ?????i th??ng tin kho?? h???c th??nh c??ng")
    }
    // history.push("/");
  };



  const fillCurrentForm = async () => {
    setPictureLink(course.picture);
    setPictures([
      {
        uid: "-1",
        name: "avatar.png",
        status: "done",
        url: course.picture,
      },
    ]);
    form.setFieldsValue({
      title: course.title,
      shortDescription: course.shortDescription,
      categoryId: course.categoryId,
      status: course.status,
      price: course.price,
      preView: course.preView,
      description: course.description,
    });
  };
  useEffect(() => {
    fillCurrentForm();
  }, [course]);

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
              {/* <img src={pictureLink} /> */}
              <Upload
                {...props}
                listType="picture-card"
                fileList={pictures}
                accept={".jpg, .png, jpeg"}
                onPreview={handlePreview}
                onChange={handleChange}
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

            <Form.Item name="price" label="Gi?? kho?? h???c" initialValue={0}>
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
                Ch???nh s???a kho?? h???c
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
