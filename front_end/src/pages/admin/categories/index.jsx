import React, { useState, useEffect } from "react";
import { Card, Button, Table, Divider, Input, Space, Popconfirm, message } from "antd";
import Highlighter from 'react-highlight-words';
import { EditOutlined, DeleteOutlined, TagsOutlined, SearchOutlined } from "@ant-design/icons";
import EditCategoryForm from "./forms/EditCategoryForm";
import AddCategoryForm from "./forms/AddCategoryForm";
import '../styles.scss';
import { httpClient } from '../../../api';
const { Column } = Table;

const categoriesEx = [
  {
    _id: 1,
    name: "Công nghệ thông tin",
    parentId: null,
    totalCourses: 20
  },
  {
    _id: 2,
    name: "Lập trình Web",
    parentId: 1,
    totalCourses: 10
  },
  {
    _id: 3,
    name: "Lập trình game",
    parentId: 1,
    totalCourses: 10
  },
]

const Category = () => {
  // All categories
  const [categories, setCategories] = useState([])
  // Edit
  const [editCategoryModalVisible, setEditCategoryModalVisible] = useState(false)
  const [currentRowData, setCurrentRowData] = useState({})
  const [editCategoryFormData, setEditCategoryFormData] = useState()
  // Add
  const [addCategoryModalVisible, setAddCategoryModalVisible] = useState(false)
  const [addCategoryFormData, setAddCategoryFormData] = useState()

  const handleCancel = () => {
    setAddCategoryModalVisible(false);
    setEditCategoryModalVisible(false);
  }

  const handleDeleteCategory = async (row) => {
    if (row.totalCourses > 0) {
      message.error('Không được xóa danh mục đã có khóa học');
      return;
    }
    const msg = await httpClient.category.deleteCategory(row._id);
    await fetchData();
    message.success('Bạn đã xóa một danh mục');
  }

  const handleAddCategory = (row) => {
    setAddCategoryModalVisible(true);
  }

  const handleAddCategoryOk = () => {

  }

  const handleAddCategoryFinish = async (values) => {
    await httpClient.category.createCategory(values);
    await fetchData();
    setAddCategoryModalVisible(false);
    message.success('Bạn đã thêm một danh mục');
  }

  const handleEditCategory = (row) => {
    setCurrentRowData(row);
    setEditCategoryModalVisible(true);
  }

  const handleEditCategoryOk = () => {
    
  }

  const handleEditCategoryFinish = async (values) => {
    await httpClient.category.editCategory(values);
    await fetchData();
    setEditCategoryModalVisible(false);
    message.success('Cập nhật thành công');
  }

  useEffect(async () => {
    await fetchData();
  }, []);

  const fetchData = async () => {
    const categories_ = await httpClient.category.getCategoriesAdmin({});

    // Find parent name
    categories_.forEach(category1 => {
      // If has no parent
      if (category1.parentId == null) {
        category1.parent = "Không có";
      } else { // Else
        categories_.forEach(category2 => {
          if (category1.parentId == category2._id) {
            category1.parent = category2.name;
          }
        });
      }
    });

    setCategories(categories_);
  }

  return (
    <div className="app-container">
      <div className="title">Tất cả danh mục</div>
      {/* <br /> */}
      <Card title={<span>
        <Button icon={<TagsOutlined />} style={{ float: "right" }} type='primary' onClick={handleAddCategory}>Thêm danh mục</Button>
      </span>}>
        <Table rowKey="_id" dataSource={categories} pagination={false} size="middle">
          <Column title="ID" dataIndex="_id" key="_id" align="center" />
          <Column title="Tiêu đề" dataIndex="name" key="name" align="center" />
          <Column title="Danh mục cha" dataIndex="parent" key="parent" align="center" />
          <Column title="Tổng số khóa học" dataIndex="totalCourses" key="totalCourses" align="center" />
          <Column title="Hành động" key="action" width={195} align="center" render={(text, row) => (
            <span>
              <Button type="primary" shape="circle" icon={<EditOutlined />} title="Sửa" onClick={() => handleEditCategory(row)} />
              <Divider type="vertical" />
              <Popconfirm
                title="Bạn có chắc là muốn xóa danh mục này không?"
                onConfirm={() => handleDeleteCategory(row)}
                okText="Có"
                cancelText="Không">
                <Button type="danger" shape="circle" icon={<DeleteOutlined />} title="Xoá"/>
              </Popconfirm>
            </span>
          )} />
        </Table>
      </Card>
      <EditCategoryForm
        currentRowData={currentRowData}
        wrappedComponentRef={formRef => console.log(formRef)}
        visible={editCategoryModalVisible}
        onCancel={handleCancel}
        onOk={handleEditCategoryOk}
        onFinish={handleEditCategoryFinish}
        allCategories={categories}
      />
      <AddCategoryForm
        visible={addCategoryModalVisible}
        onCancel={handleCancel}
        onOk={handleAddCategoryOk}
        onFinish={handleAddCategoryFinish}
        allCategories={categories}
      />
    </div>
  );
}

export default Category;
