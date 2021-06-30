import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, Button, Upload, message, Divider, Select } from 'antd';
import { PlusOutlined, VerticalAlignTopOutlined, MinusCircleOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useHistory } from 'react-router-dom'
import { uploadFile } from 'react-s3';
import './styles.scss'

const { TextArea } = Input
const { Option, OptGroup } = Select;

const PostCourse = ({ categories }) => {

    let [form] = Form.useForm();
    const history = useHistory();
    const [videos, setVideos] = useState([])

    const parentCategories = categories.filter((category) => { return !category.parentId })
    const childrenCategories = categories.filter((category) => { return !!category.parentId })

    const S3_BUCKET = 'online-academy-chatbot';
    const REGION = 'us-east-2';
    const ACCESS_KEY = 'AKIA55S5NLZ6FNOPY6XJ';
    const SECRET_ACCESS_KEY = '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';

    const config = {
        bucketName: S3_BUCKET,
        region: REGION,
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
    }

    const handleUpload = async (files) => {
        uploadFile(files.file, config)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    const props = {
        name: 'videos',
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: percent => `${parseFloat(percent.toFixed(2))}%`,
        },
    };

    const onFinish = (values) => {
        console.log(values)
        // handleUpload(values.videos)
    };

    useEffect(() => {

    }, [])
    return (
        <div className="postCourse-container">
            <h1>Tạo khoá học mới</h1>
            <Divider />
            {
                (!categories) ? null :
                    <Form
                        onFinish={onFinish}
                        className="post-course-form"
                        form={form}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 16, offset: 1
                        }}
                    >
                        <Form.Item
                            name="title"
                            label="Tiêu đề"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tiêu đề khoá học!',
                                    whitespace: false
                                }
                            ]}
                        >
                            <Input
                                placeholder="Tiêu đề"
                            />
                        </Form.Item>
                        <Form.Item
                            name="categoryId"
                            label="Thể loại"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tiêu đề khoá học!',
                                    whitespace: false
                                }
                            ]}
                        >
                            <Select style={{ width: 200 }}>
                                {
                                    parentCategories.map((item, index) => {
                                        if (childrenCategories.findIndex((value) => value.parentId == item._id) === -1) {
                                            return (<Option key={`category ${index}`} value={item._id}>{item.name}</Option>)
                                        }
                                        else {
                                            return (
                                                <OptGroup key={`category ${index}`} label={item.name}>
                                                    {
                                                        childrenCategories.map((child, childIndex) => {
                                                            if (child.parentId === item._id) {
                                                                return (<Option key={`category child ${childIndex}`} value={child._id}>{child.name}</Option>)
                                                            }
                                                        })
                                                    }

                                                </OptGroup>
                                            )

                                        }
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="shortDescription"
                            label="Mô tả tóm tắt"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Mô tả ngắn gọn!',
                                    whitespace: true
                                }
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
                                    message: 'Vui lòng nhập nội dung chi tiết khoá học!'
                                }
                            ]}
                            hasFeedback
                        >
                            <ReactQuill theme="snow" />
                        </Form.Item>

                        <Form.Item
                            label="Bài học"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập thêm ít nhất một video bài học!'
                                }
                            ]}
                        >
                            <Form.List 
                            name="videoList"
                            rules={[
                                {
                                  validator: async (_, videoList) => {
                                    if (!videoList || videoList.length < 1) {
                                      return Promise.reject(new Error('Vui lòng nhập thêm ít nhất một video bài học!'));
                                    }
                                  },
                                },
                              ]}
                              >
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(field => (
                                            <div key={field.key}
                                                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "start" }} align="baseline">
                                                <Form.Item
                                                    noStyle
                                                    shouldUpdate={(prevValues, curValues) =>
                                                        prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                                    }
                                                >
                                                    {() => (
                                                        <Form.Item
                                                            {...field}
                                                            // label="Video Name"
                                                            name={[field.name, 'videoName']}
                                                            fieldKey={[field.fieldKey, 'videoName']}
                                                            rules={[{ required: true, message: 'Vui lòng nhập tên bài học' }]}
                                                        >
                                                            <Input placeholder="Tên bài học" style={{ width: "100%" }} />
                                                        </Form.Item>
                                                    )}
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    // label="Video"
                                                    name={[field.name, 'video']}
                                                    fieldKey={[field.fieldKey, 'video']}
                                                    rules={[
                                                        {
                                                          validator: async () => {
                                                            if (!videos || videos.length < 1) {
                                                              return Promise.reject(new Error('Vui lòng nhập thêm ít nhất một video bài học!'));
                                                            }
                                                          },
                                                        },
                                                      ]}
                                                >
                                                    <Upload
                                                        {...props}
                                                        beforeUpload={() => false}
                                                        fileList={videos}
                                                        onChange={({ fileList }) => { setVideos(fileList) }}
                                                        maxCount={1}
                                                    >
                                                        {
                                                            videos.length > 0 ? null :
                                                                <Button icon={<VerticalAlignTopOutlined />} style={{ marginLeft: 10 }} >
                                                                    Upload Videos
                                                                </Button>
                                                        }

                                                    </Upload>
                                                </Form.Item>

                                                <MinusCircleOutlined onClick={() => remove(field.name)} style={{ float: "right", marginLeft: 5, marginBottom: 10 }} />
                                            </div>
                                        ))}

                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Thêm bài học
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Form.Item>

                        <Form.Item
                            name="status"
                            label="Trạng thái"
                            initialValue="incomplete"
                            rules={[
                                {
                                    required: true,
                                }
                            ]}
                        >
                            <Select style={{ width: 150 }}>
                                <Option value="incomplete">Chưa hoàn thành</Option>
                                <Option value="complete">Hoàn thành</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item wrapperCol={{
                            span: 10, offset: 5
                        }}
                        >
                            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                                Thêm khoá học
                            </Button>
                        </Form.Item>
                    </Form>

            }

        </div>
    )
}

const mapState = (state) => ({
    categories: state.category.categories,
});
const mapDispatch = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapState, mapDispatch)(PostCourse);