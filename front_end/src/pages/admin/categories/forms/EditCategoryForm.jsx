import React, { useState, useEffect } from "react";
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

  const [form] = Form.useForm();
  form.setFieldsValue({
    _id: _id,
    name: name,
    parentId: parentId,
  })

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
      <Form {...formItemLayout} form={form} onFinish={onFinish} id="myForm">
        <Form.Item name="_id" label="ID:"><Input disabled/>
        </Form.Item>
        <Form.Item name="name" label="Tiêu đề:" rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}>
          <Input placeholder="Tiêu đề"/>
        </Form.Item>
        <Form.Item name="parentId" label="Danh mục cha:">
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
