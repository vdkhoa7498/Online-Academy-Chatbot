import React from "react";
import { Form, Input, Select, Modal, Button } from "antd";

const AddLecturerForm = (props) => {
  const { visible, onCancel, onOk, onFinish } = props;
  const formItemLayout = {
    labelCol: {
      sm: { span: 6 },
    },
    wrapperCol: {
      sm: { span: 18 },
    },
  };

  // Validate password
  const passwordValidator = (rule, value) => {
    if (value.length < 8) {
      return Promise.reject(new Error('Mật khẩu phải chứa ít nhất 8 ký tự!'));
    } else {
      return Promise.resolve();
    }
  }

  return (
    <Modal
      width="40%"
      title="Tạo tài khoản giảng viên"
      visible={visible}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy bỏ
        </Button>,
        <Button key="submit" form="myForm" htmlType="submit" type="primary" onClick={onOk}>
          Tạo
        </Button>,
      ]}
    >
      <Form {...formItemLayout} onFinish={onFinish} id="myForm">
        <Form.Item name="email" label="Email:" rules={[{ required: true, message: "Vui lòng nhập email!" }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="fullName" label="Tên:" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
          <Input placeholder="Tên" />
        </Form.Item>
        <Form.Item name="password" label="Mật khẩu:"
          rules={[
            {
              required: true, message: "Vui lòng nhập mật khẩu!"
            },
            {
              validator: passwordValidator
            }
          ]}>
          <Input.Password placeholder="Mật khẩu"/>
        </Form.Item>
        <Form.Item name="confirm" label="Xác nhận mật khẩu:"
          rules={[
            {
              required: true, message: "Vui lòng xác nhận mật khẩu!"
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('Mật khẩu không khớp!'));
              },
            }),
          ]}>
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddLecturerForm