import React from "react";
import { Form, Input, Select, Modal, Button } from "antd";



const EditLecturerForm = (props) => {
  const {
    visible,
    onCancel,
    onOk,
    currentRowData,
    onFinish
  } = props;
  const { id, name, email } = currentRowData;
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
        <Form.Item label="ID:"><Input disabled value={id}/>
        </Form.Item>
        <Form.Item label="Email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}><Input placeholder="Email" value={email}/>
        </Form.Item>
        <Form.Item label="Tên:" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}><Input placeholder="Tên" value={name}/>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditLecturerForm
