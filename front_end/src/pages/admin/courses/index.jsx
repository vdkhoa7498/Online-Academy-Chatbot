import React, { useState, useEffect } from "react";
import { Card, Button, Table, message, Divider, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons"
import '../styles.scss'
import { httpClient } from '../../../api'
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
  const [courses, setCourses] = useState([])
  const [currentRowData, setCurrentRowData] = useState({})

  const handleDeleteCourse = async (row) => {
    await httpClient.course.deleteCourse(row._id);
    await fetchData();
    message.success('Bạn đã gỡ bỏ một khóa học');
  }

  useEffect(async () => {
    await fetchData();
  }, [])

  const fetchData = async () => {
    const courses_ = await httpClient.course.getAllCourses();
    // Set category name
    courses_.forEach(course => {
      course.categoryName = course.category[0].name;
      if (course.lecturer.length > 0) {
        course.lecturerName = course.lecturer[0].fullName;
      }
    });
    setCourses(courses_);
  }

  return (
    <div className="app-container">
      <div className="title">Danh sách khóa học</div>
      {/* <br /> */}
      <Card>
        <Table bordered rowKey="_id" dataSource={courses} pagination={false}>
          <Column title="ID" dataIndex="_id" key="_id" align="center" />
          <Column title="Tên khóa học" dataIndex="title" key="title" align="center" />
          <Column title="Mô tả" dataIndex="shortDescription" key="shortDescription" align="center" />
          <Column title="Giảng viên" dataIndex="lecturerName" key="lecturerName" align="center" />
          <Column title="Danh mục" dataIndex="categoryName" key="categoryName" align="center" />
          <Column title="Gỡ bỏ" key="action" align="center" render={(text, row) => (
            <Popconfirm
              title="Bạn có chắc là muốn gỡ bỏ khóa học này không?"
              onConfirm={() => handleDeleteCourse(row)}
              okText="Có"
              cancelText="Không">
              <Button type="danger" shape="circle" icon={<DeleteOutlined />} title="Xoá"/>
            </Popconfirm>
          )} />
        </Table>
      </Card>
    </div>
  );
}

export default Course;
