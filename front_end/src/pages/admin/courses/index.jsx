import React, { useState, useEffect } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons"
import '../styles.scss'
const { Column } = Table;

const coursesEx = [
  {
    id: 1,
    title: "Tự học guitar",
    short_description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit sed eum obcaecati dolor ipsa esse error fugit facilis accusantium qui nulla recusandae asperiores veritatis ut totam reiciendis, optio quisquam rerum.",
    lecturer: "Nguyễn Mạnh Linh"
  },
  {
    id: 2,
    title: "Lập trình Web",
    short_description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit sed eum obcaecati dolor ipsa esse error fugit facilis accusantium qui nulla recusandae asperiores veritatis ut totam reiciendis, optio quisquam rerum.",
    lecturer: "Nguyễn Mạnh Linh"
  },
  {
    id: 3,
    title: "Lập trình Game bằng Unity",
    short_description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit sed eum obcaecati dolor ipsa esse error fugit facilis accusantium qui nulla recusandae asperiores veritatis ut totam reiciendis, optio quisquam rerum.",
    lecturer: "Nguyễn Mạnh Linh"
  },
]

const Course = () => {
  const [courses, setCourses] = useState(coursesEx)
  const [currentRowData, setCurrentRowData] = useState({})

  const handleDeleteCourse = (row) => {

  }

  useEffect(() => {

  }, [])

  return (
    <div className="app-container">
      <div className="title">Danh sách khóa học</div>
      {/* <br /> */}
      <Card>
        <Table bordered rowKey="id" dataSource={courses} pagination={false}>
          <Column title="ID" dataIndex="id" key="id" align="center" />
          <Column title="Tên khóa học" dataIndex="title" key="title" align="center" />
          <Column title="Mô tả" dataIndex="short_description" key="short_description" align="center" />
          <Column title="Giảng viên" dataIndex="lecturer" key="lecturer" align="center" />
          <Column title="Gỡ bỏ khóa học" key="action" width={195} align="center" render={(text, row) => (
            <Button type="danger" shape="circle" icon={<DeleteOutlined />} title="Xoá" onClick={handleDeleteCourse} />
          )} />
        </Table>
      </Card>
    </div>
  );
}

export default Course;
