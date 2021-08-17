import React, { useState, useEffect } from "react";
import { Card, Button, Table, message, Divider, Popconfirm } from "antd";
import { DeleteOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons"
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
  const [courses, setCourses] = useState([]);
  const [currentRowData, setCurrentRowData] = useState({});
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [lecturerFilters, setLecturerFilters] = useState([]);

  const handleLockCourse = async (row) => {
    await httpClient.course.lockCourse(row._id);
    await fetchData();
    message.success('Bạn đã đình chỉ khóa học');
  }

  const handleUnlockCourse = async (row) => {
    await httpClient.course.unlockCourse(row._id);
    await fetchData();
    message.success('Bạn đã mở lại khóa học');
  }

  useEffect(async () => {
    await fetchData();
    await fecthCategories();
    await fecthLecturers();
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

  const fecthCategories = async () => {
    let filters = [];
    const categories = await httpClient.category.getCategories({});
    categories.forEach(category => {
      if (category.parentId) {
        filters.push({
          text: category.name,
          value: category.name
        });
      }
    });
    setCategoryFilters(filters);
  }

  const fecthLecturers = async () => {
    let filters = [];
    const lecturers = await httpClient.user.getLecturers();
    lecturers.results.forEach(lecturer => {
      filters.push({
        text: lecturer.fullName,
        value: lecturer.fullName
      });
    });
    setLecturerFilters(filters);
  }

  const onCategoryFilter = (value, record) => {
    return value == record.categoryName;
  };

  const onLecturerFilter = (value, record) => {
    return value == record.lecturerName;
  };

  return (
    <div className="app-container">
      <div className="title">Danh sách khóa học</div>
      {/* <br /> */}
      <Card>
        <Table bordered rowKey="_id" dataSource={courses} pagination={false}>
          <Column title="ID" dataIndex="_id" key="_id" align="center" />
          <Column title="Tên khóa học" dataIndex="title" key="title" align="center" />
          {/* <Column title="Mô tả" dataIndex="shortDescription" key="shortDescription" align="center" /> */}
          <Column title="Giảng viên" dataIndex="lecturerName" key="lecturerName" align="center" filters={lecturerFilters} onFilter={onLecturerFilter} />
          <Column title="Danh mục" dataIndex="categoryName" key="categoryName" align="center" filters={categoryFilters} onFilter={onCategoryFilter} />
          <Column title="Hành động" key="action" align="center" render={(text, row) => (
            !row.disabled ?
              <Popconfirm
                title="Bạn có chắc là muốn đình chỉ khóa học này không?"
                onConfirm={() => handleLockCourse(row)}
                okText="Có"
                cancelText="Không">
                <Button type="danger" shape="circle" icon={<LockOutlined />} />
              </Popconfirm> :
              <Popconfirm
                title="Bạn có chắc là muốn mở lại khóa học này không?"
                onConfirm={() => handleUnlockCourse(row)}
                okText="Có"
                cancelText="Không">
                <Button type="primary" shape="circle" icon={<UnlockOutlined />} />
              </Popconfirm>
          )} />
        </Table>
      </Card>
    </div>
  );
}

export default Course;
