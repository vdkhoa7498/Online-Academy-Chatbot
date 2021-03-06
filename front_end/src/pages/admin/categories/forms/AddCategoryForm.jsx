import React from "react";
import { Form, Input, Select, Modal, Button } from "antd";



const AddCategoryForm = (props) => {
  const { visible, onCancel, onOk, onFinish, allCategories } = props;

  // Get parent categories
  const allParentCategories_ = [];
  allCategories.forEach(category => {
    if (category.parentId == null) {
      allParentCategories_.push(category)
    }
  });

  const formItemLayout = {
    labelCol: {
      sm: { span: 5 },
    },
    wrapperCol: {
      sm: { span: 19 },
    },
  };
  return (
    <Modal
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
        <Form.Item name="parentId" label="Danh mục cha:" initialValue={null}>
          <Select>
            <Select.Option value={null}>Không có</Select.Option>
            {
              allParentCategories_.map(category =>
                <Select.Option value={category._id}>{category.name}</Select.Option>
              )
            }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddCategoryForm