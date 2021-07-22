import React from "react";
import { Form, Input, Select, Modal, Button } from "antd";

const EditStudentForm = (props) => {
  const {
    visible,
    onCancel,
    onOk,
    currentRowData,
    onFinish
  } = props;
  const { id, fullName, email } = currentRowData;

  const [form] = Form.useForm();
  form.setFieldsValue({
    id: id,
    fullName: fullName,
    email: email
  });

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
      title="Cập nhật thông tin học viên"
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
      <Form form={form} {...formItemLayout} onFinish={onFinish} id="myForm">
        <Form.Item name="id" label="ID:"><Input disabled/>
        </Form.Item>
        <Form.Item name="email" label="Email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}><Input disabled placeholder="Email"/>
        </Form.Item>
        <Form.Item name="fullName" label="Tên:" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}><Input placeholder="Tên"/>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditStudentForm
