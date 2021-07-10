import React, { useState, useEffect } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import EditStudentForm from "./forms/EditStudentForm"
import '../styles.scss'
const { Column } = Table;

const studentsEx = [
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

const Student = () => {
  const [students, setStudents] = useState(studentsEx)
  const [editStudentModalVisible, setEditStudentModalVisible] = useState(false)
  const [currentRowData, setCurrentRowData] = useState({})
  const [editStudentFormData, setEditStudentFormData] = useState()

  const handleCancel = () => {
    setEditStudentModalVisible(false)
  }

  const handleDeleteStudent = (row) => {

  }

  const handleEditStudent = (row) => {
    setCurrentRowData(row)
    setEditStudentModalVisible(true)
  };

  const handleEditStudentOk = () => {
  }

  useEffect(() => {

  }, [])

  return (
    <div className="app-container">
      <div className="title">Danh sách học viên</div>
      {/* <br /> */}
      <Card>
        <Table bordered rowKey="id" dataSource={students} pagination={false}>
          <Column title="ID" dataIndex="id" key="id" align="center" />
          <Column title="Tên" dataIndex="name" key="name" align="center" />
          <Column title="Email" dataIndex="email" key="email" align="center" />
          <Column title="Hành động" key="action" width={195} align="center" render={(text, row) => (
            <span>
              <Button type="primary" shape="circle" icon={<EditOutlined />} title="Sửa" onClick={handleEditStudent} />
              <Divider type="vertical" />
              <Button type="danger" shape="circle" icon={<DeleteOutlined />} title="Xoá" onClick={handleDeleteStudent} />
            </span>
          )} />
        </Table>
      </Card>
      <EditStudentForm
        currentRowData={currentRowData}
        wrappedComponentRef={formRef => console.log(formRef)}
        visible={editStudentModalVisible}
        onCancel={handleCancel}
        onOk={handleEditStudentOk}
        onFinish={(values => setEditStudentFormData(values))}
      />
    </div>
  );
}

export default Student;
