import React, { useState, useEffect } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import { EditOutlined, DeleteOutlined, TagsOutlined } from "@ant-design/icons"
import EditCategoryForm from "./forms/EditCategoryForm"
import AddCategoryForm from "./forms/AddCategoryForm"
import '../styles.scss'
const { Column } = Table;

const categoriesEx = [
  {
    id: 1,
    name: "Công nghệ thông tin",
    parent: null,
    totalCourses: 20
  },
  {
    id: 2,
    name: "Lập trình Web",
    parent: "Công nghệ thông tin",
    totalCourses: 10
  },
  {
    id: 3,
    name: "Lập trình game",
    parent: "Công nghệ thông tin",
    totalCourses: 10
  },
]

const Category = () => {
  const [categories, setCategories] = useState(categoriesEx)
  const [editCategoryModalVisible, setEditCategoryModalVisible] = useState(false)
  const [currentRowData, setCurrentRowData] = useState({})
  const [addCategoryModalVisible, setAddCategoryModalVisible] = useState(false)
  const [addCategoryFormData, setAddCategoryFormData] = useState()
  const [editCategoryFormData, setEditCategoryFormData] = useState()

  const handleCancel = () => {
    setAddCategoryModalVisible(false)
    setEditCategoryModalVisible(false)
  }

  const handleDeleteCategory = (row) => {

  }

  const handleAddCategory = (row) => {
    setAddCategoryModalVisible(true)
  };

  const handleAddCategoryOk = () => {
    console.log(addCategoryFormData)
  }

  const handleEditCategory = (row) => {
    setCurrentRowData(row)
    setEditCategoryModalVisible(true)
  };

  const handleEditCategoryOk = () => {
  }

  useEffect(() => {

  }, [])

  return (
    <div className="app-container">
      <div className="title">Tất cả danh mục</div>
      {/* <br /> */}
      <Card title={<span>
        <Button icon={<TagsOutlined />} style={{ float: "right" }} type='primary' onClick={handleAddCategory}>Thêm danh mục</Button>
      </span>}>
        <Table bordered rowKey="id" dataSource={categories} pagination={false}>
          <Column title="ID" dataIndex="id" key="id" align="center" />
          <Column title="Tiêu đề" dataIndex="name" key="name" align="center" />
          <Column title="Danh mục cha" dataIndex="parent" key="parent" align="center" />
          <Column title="Tổng số khóa học" dataIndex="totalCourses" key="totalCourses" align="center" />
          <Column title="Hành động" key="action" width={195} align="center" render={(text, row) => (
            <span>
              <Button type="primary" shape="circle" icon={<EditOutlined />} title="Sửa" onClick={handleEditCategory} />
              <Divider type="vertical" />
              <Button type="danger" shape="circle" icon={<DeleteOutlined />} title="Xoá" onClick={handleDeleteCategory} />
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
        onFinish={(values => setEditCategoryFormData(values))}
      />
      <AddCategoryForm
        visible={addCategoryModalVisible}
        onCancel={handleCancel}
        onOk={handleAddCategoryOk}
        onFinish={(values => console.log(values))}
      />
    </div>
  );
}

export default Category;
