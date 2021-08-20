import React, { useState, useEffect } from "react";
import { Card, Button, Table, message, Divider, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons"
import EditStudentForm from "./forms/EditStudentForm"
import '../styles.scss'
import { httpClient } from '../../../api'
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
  const [students, setStudents] = useState([])
  const [editStudentModalVisible, setEditStudentModalVisible] = useState(false)
  const [currentRowData, setCurrentRowData] = useState({})
  const [editStudentFormData, setEditStudentFormData] = useState()

  const handleCancel = () => {
    setEditStudentModalVisible(false);
  }

  const handleLockStudent = async (row) => {
    await httpClient.user.lockUser(row.id);
    await fetchData();
    message.success('Đã khóa tài khoản');
  }

  const handleUnlockStudent = async (row) => {
    await httpClient.user.unlockUser(row.id);
    await fetchData();
    message.success('Đã mở khóa tài khoản');
  }

  const handleEditStudent = (row) => {
    setCurrentRowData(row);
    setEditStudentModalVisible(true);
  }

  const handleEditStudentOk = () => {

  }

  const handleEditStudentFinish = async (form) => {
    await httpClient.user.editUser(form);
    await fetchData();
    setEditStudentModalVisible(false);
    message.success('Cập nhật thành công');
  }

  useEffect(async () => {
    await fetchData();
  }, []);

  const fetchData = async () => {
    const students_ = await httpClient.user.getStudents();
    setStudents(students_.results);
  }

  return (
    <div className="app-container">
      <div className="title">Danh sách học viên</div>
      {/* <br /> */}
      <Card>
        <Table bordered rowKey="id" dataSource={students}>
          <Column title="ID" dataIndex="id" key="id" align="center" />
          <Column title="Tên" dataIndex="fullName" key="fullName" align="center" />
          <Column title="Email" dataIndex="email" key="email" align="center" />
          <Column title="Hành động" key="action" width={195} align="center" render={(text, row) => (
            <span>
              <Button shape="circle" icon={<EditOutlined />} title="Sửa" onClick={() => handleEditStudent(row)} />
              <Divider type="vertical" />
              {
                !row.disabled ?
                  <Popconfirm
                    title="Bạn có chắc là muốn khóa tài khoản này không?"
                    onConfirm={() => handleLockStudent(row)}
                    okText="Có"
                    cancelText="Không">
                    <Button type="danger" shape="circle" icon={<LockOutlined />} />
                  </Popconfirm> :
                  <Popconfirm
                    title="Bạn có chắc là muốn mở khóa tài khoản này không?"
                    onConfirm={() => handleUnlockStudent(row)}
                    okText="Có"
                    cancelText="Không">
                    <Button type="primary" shape="circle" icon={<UnlockOutlined />} />
                  </Popconfirm>
              }
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
        onFinish={handleEditStudentFinish}
      />
    </div>
  );
}

export default Student;
