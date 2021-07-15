import React from "react";
import { Form, Input, Select, Modal, Button } from "antd";



const EditCategoryForm = (props) => {
  const {
    visible,
    onCancel,
    onOk,
    currentRowData,
    onFinish,
    allCategories
  } = props;
  const { _id, name, parentId } = currentRowData;
  
  // Get parent categories
  const allParentCategories_ = [];
  allCategories.forEach(category => {
    if (category.parentId == null) {
      allParentCategories_.push(category)
    }
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
        <Form.Item label="ID:"><Input disabled value={_id}/>
        </Form.Item>
        <Form.Item label="Tiêu đề:" rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}>
          <Input placeholder="Tiêu đề" value={name}/>
        </Form.Item>
        <Form.Item name="parent" label="Danh mục cha:" rules={[{ required: true, message: "Vui lòng chọn danh mục cha!" }]}>
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

export default EditCategoryForm
