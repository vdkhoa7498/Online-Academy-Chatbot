import React from "react";
import { Form, Input, Select, Modal, Button } from "antd";



const AddCategoryForm = (props) => {
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
      width='50%'
      title="Tạo danh mục"
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
        <Form.Item name="name" label="Tiêu đề:" rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}>
          <Input placeholder="Tiêu đề" />
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

export default AddCategoryForm