import React from "react";
import { Form, Input, Select, Modal, Button } from "antd";
const EditUserForm = (props) => {
  const {
    visible,
    onCancel,
    onOk,
    currentRowData,
    onFinish
  } = props;
  const { id, name, role, email } = currentRowData;
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
      title="Cập nhật thông tin giảng viên"
      visible={visible}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy bỏ
        </Button>,
        <Button key="submit" form="myForm" htmlType="submit" type="primary" onClick={onOk}>
          Cập nhật
        </Button>,
      ]}
    >
      <Form {...formItemLayout} onFinish={onFinish} id="myForm">
        <Form.Item label="ID:" initialValue={id}><Input disabled />
        </Form.Item>
        <Form.Item label="Email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          initialValue={email}><Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Tên:" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          initialValue={name}><Input placeholder="Tên" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditUserForm
