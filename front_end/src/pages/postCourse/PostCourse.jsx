import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useHistory } from 'react-router-dom'
import './styles.scss'


const PostCourse = () => {

    let [form] = Form.useForm();
    const history = useHistory();

    const onFinish = (data) => {
        console.log(data)
    };

    useEffect(() => {

    }, [])

    return (
        <div className="postCourse-container">
            <Form onFinish={onFinish} className="register-form" form={form}>

                <Form.Item
                    name="title"
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
                    name="shortDescription"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Mô tả ngắn gọn!',
                            whitespace: true
                        }
                    ]}
                >
                    <Input
                        // prefix={
                        // <UserOutlined
                        //     style={{
                        //     color: 'rgba(0,0,0,.25)'
                        //     }}
                        // />
                        // }
                        placeholder="Tên của bạn"
                        maxLength="45"
                    />
                </Form.Item>

                <Form.Item
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập nội dung chi tiết khoá học!'
                        }
                    ]}
                    hasFeedback
                >
                    <Editor
                        // editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        // onEditorStateChange={this.onEditorStateChange}
                        style={{ background: 'white' }}
                    />
                </Form.Item>

                <Form.Item
                    label="Videos"
                    name="videos"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập thêm ít nhất một video bài học!'
                        }
                    ]}
                >
                    <Upload
                        beforeUpload={() => false}
                        // fileList={photoList}
                        multiple
                    >
                        <Button>
                            Upload Videos
                        </Button>
                    </Upload>
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-form-button" icon={<PlusOutlined />}>
                        Thêm khoá học
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default PostCourse