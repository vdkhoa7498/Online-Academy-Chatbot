import React, { useState, useEffect } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import { EditOutlined, DeleteOutlined, UserAddOutlined } from "@ant-design/icons"
import EditLecturerForm from "./forms/EditLecturerForm"
import AddLecturerForm from "./forms/AddLecturerForm"
import '../styles.scss'
const { Column } = Table;

const lecturersEx = [
  {
    id: 1,
    name: "Nguyễn Mạnh Linh",
    email: "nmlinh@gmail.com"
  },
  {
    id: 2,
    name: "Võ Đăng Khoa",
    email: "vdkhoa@gmail.com"
  },
  {
    id: 3,
    name: "Phạm Phi Long",
    email: "pplong@gmail.com"
  }
]

const Lecturer = () => {
  const [lecturers, setLecturers] = useState(lecturersEx)
  const [editLecturerModalVisible, setEditLecturerModalVisible] = useState(false)
  const [currentRowData, setCurrentRowData] = useState({})
  const [addLecturerModalVisible, setAddLecturerModalVisible] = useState(false)
  const [addLecturerFormData, setAddLecturerFormData] = useState()
  const [editLecturerFormData, setEditLecturerFormData] = useState()

  const handleCancel = () => {
    setAddLecturerModalVisible(false)
    setEditLecturerModalVisible(false)
  }

  const handleDeleteLecturer = (row) => {

  }

  const handleAddLecturer = (row) => {
    setAddLecturerModalVisible(true)
  };

  const handleAddLecturerOk = () => {
    console.log(addLecturerFormData)
  }

  const handleEditLecturer = (row) => {
    setCurrentRowData(row)
    setEditLecturerModalVisible(true)
  };

  const handleEditLecturerOk = () => {
  }

  useEffect(() => {

  }, [])

  return (
    <div className="app-container">
      <div className="title">Danh sách giảng viên</div>
      {/* <br /> */}
      <Card title={<span>
        <Button icon={<UserAddOutlined />} style={{ float: "right" }} type='primary' onClick={handleAddLecturer}>Thêm giảng viên</Button>
      </span>}>
        <Table bordered rowKey="id" dataSource={lecturers} pagination={false}>
          <Column title="ID" dataIndex="id" key="id" align="center" />
          <Column title="Tên" dataIndex="name" key="name" align="center" />
          <Column title="Email" dataIndex="email" key="email" align="center" />
          <Column title="Hành động" key="action" width={195} align="center" render={(text, row) => (
            <span>
              <Button type="primary" shape="circle" icon={<EditOutlined />} title="Sửa" onClick={handleEditLecturer} />
              <Divider type="vertical" />
              <Button type="danger" shape="circle" icon={<DeleteOutlined />} title="Xoá" onClick={handleDeleteLecturer} />
            </span>
          )} />
        </Table>
      </Card>
      <EditLecturerForm
        currentRowData={currentRowData}
        wrappedComponentRef={formRef => console.log(formRef)}
        visible={editLecturerModalVisible}
        onCancel={handleCancel}
        onOk={handleEditLecturerOk}
        onFinish={(values => setEditLecturerFormData(values))}
      />
      <AddLecturerForm
        visible={addLecturerModalVisible}
        onCancel={handleCancel}
        onOk={handleAddLecturerOk}
        onFinish={(values => console.log(values))}
      />
    </div>
  );
}

export default Lecturer;
