import React, { useState, useEffect } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import { EditOutlined , DeleteOutlined } from "@ant-design/icons"
import EditUserForm from "./forms/EditUserForm"
import AddUserForm from "./forms/AddUserForm"
const { Column } = Table;
const User = () => {
  const [users, setUsers] = useState([{id: 1, name: "abc", role: "student", email: "abc@gmail.com"}])
  const [editUserModalVisible, setEditUserModalVisible] = useState(false)
  const [currentRowData, setCurrentRowData] = useState({})
  const [addUserModalVisible, setAddUserModalVisible] = useState(false)
  const [addUserFormData, setAddUserFormData] = useState()
  const [editUserFormData, setEditUserFormData] = useState()
  
  const handleCancel = () =>{
    setAddUserModalVisible(false)
    setEditUserModalVisible(false)
  }

  const  handleDeleteUser = (row) => {
    
  }

  const handleAddUser = (row) => {
    setAddUserModalVisible(true)
  };

  const handleAddUserOk = () => {
    console.log(addUserFormData)
  }

  const handleEditUser = (row) => {
    setCurrentRowData(row)
    setEditUserModalVisible(true)
  };

  const handleEditUserOk = () => {
  }

  useEffect(()=>{

  }, [])
  
  return (
    <div className="app-container">
      <br/>
      <Card title={<span>
      <Button style={{float: "right"}} type='primary' onClick={handleAddUser}>Thêm user</Button>
    </span>}>
        <Table bordered rowKey="id" dataSource={users} pagination={false}>
          <Column title="ID" dataIndex="id" key="id" align="center"/>
          <Column title="Tên" dataIndex="name" key="name" align="center"/>
          <Column title="Vai trò" dataIndex="role" key="role" align="center"/>
          <Column title="Email" dataIndex="description" key="description" align="center" />
          <Column title="Hành động" key="action" width={195} align="center"render={(text, row) => (
            <span>
              <Button type="primary" shape="circle" icon={<EditOutlined  />} title="Sửa" onClick={handleEditUser}/>
              <Divider type="vertical" />
              <Button type="primary" shape="circle" icon={<DeleteOutlined />} title="Xoá" onClick={handleDeleteUser}/>
            </span>
          )}/>
        </Table>
      </Card>
      <EditUserForm
        currentRowData={currentRowData}
        wrappedComponentRef={formRef => console.log(formRef)}
        visible={editUserModalVisible}
        onCancel={handleCancel}
        onOk={handleEditUserOk}
        onFinish={(values => setEditUserFormData(values))}
      />  
      <AddUserForm
        visible={addUserModalVisible}
        onCancel={handleCancel}
        onOk={handleAddUserOk}
        onFinish={(values => console.log(values))}
      />  
    </div>
  );
}

export default User;
