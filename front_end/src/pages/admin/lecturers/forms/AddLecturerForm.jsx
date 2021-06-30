import React from "react";
import { Form, Input, Select, Modal, Button } from "antd";



const AddLecturerForm = (props) => {
  const { visible, onCancel, onOk, onFinish } = props;
  const formItemLayout = {
    labelCol: {
      sm: { span: 4 },
    },
    wrapperCol: {
      sm: { span: 16 },
    },
  };
  return (
    <Modal
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
        <Form.Item name="name" label="Tên:" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
          <Input placeholder="Tên" />
        </Form.Item>
        <Form.Item name="password" label="Mật khẩu:" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
          <Input.Password placeholder="Mật khẩu"/>
        </Form.Item>

        {/* <Form.Item name="role" label="Vai trò:" initialValue="student">
          <Select style={{ width: 120 }}>
            <Select.Option value="student">student</Select.Option>
            <Select.Option value="teacher">teacher</Select.Option>
            <Select.Option value="admin">admin</Select.Option>
          </Select>
        </Form.Item> */}
      </Form>
    </Modal>
  );
}

export default AddLecturerForm