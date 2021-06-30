import React from "react";
import { Form, Input, Select, Modal, Button } from "antd";



const EditCategoryForm = (props) => {
  const {
    visible,
    onCancel,
    onOk,
    currentRowData,
    onFinish
  } = props;
  const { id, name, parent, totalCourses } = currentRowData;
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
      title="Cập nhật danh mục"
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
        <Form.Item label="Tiêu đề:"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          initialValue={name}><Input placeholder="Tiêu đề" />
        </Form.Item>
        <Form.Item name="parent" label="Danh mục cha:" initialValue="none">
          <Select>
            <Select.Option value="none">Không có</Select.Option>
            <Select.Option value="it">Công nghệ thông tin</Select.Option>
            <Select.Option value="art">Nghệ thuật</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditCategoryForm
