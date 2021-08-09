import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Table,
  message,
  Divider,
  Popconfirm,
  Row,
  Col,
  Drawer,
  Rate
} from "antd";
import { Markup } from "interweave";
import { DeleteOutlined } from "@ant-design/icons";
import { httpClient } from "../../../api";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./styles.scss";
import DetailCourse from "./DetailCourse";
const { Column } = Table;

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">
      <strong>{title}:</strong>
    </p>
    {content}
  </div>
);

const ListCourse = (props) => {
  const { categories } = props;
  const user = JSON.parse(localStorage.getItem("user"));
  let categoryNameList = [];
  categories.map((item) => {
    categoryNameList[item._id] = item.name;
  });
  const [courses, setCourses] = useState([]);
  const [visible, SetVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});

  const handleDeleteCourse = async (row) => {
    await httpClient.course.deleteCourse(row._id);
    await fetchData();
    message.success("Bạn đã gỡ bỏ một khóa học");
  };

  const showDrawer = () => {
    SetVisible(true);
  };

  const onClose = () => {
    SetVisible(false);
  };

  useEffect(async () => {
    await fetchData();
  }, []);

  const fetchData = async () => {
    const lecturerId = localStorage.getItem("user").id;
    const response = await httpClient.course.getCourses({
      lecturerId,
    });
    const courses_ = response.results;
    console.log(categoryNameList);
    // Set category name
    // courses_.forEach((course) => {
    //   course.categoryName = course.category[0].name;
    // });
    setCourses(courses_);
  };

  return (
    <div className="app-container">
      <DetailCourse selectedCourse={selectedCourse} visible={visible} onClose={onClose} />
      <div className="title">Danh sách khóa học của tôi</div>
      {/* <br /> */}
      <Card>
        <Table
          bordered
          rowKey="id"
          dataSource={courses}
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setSelectedCourse(record);
                showDrawer();
              }, // click row
            };
          }}
        >
          <Column title="ID" dataIndex="id" key="id" align="center" />
          <Column
            title="Tên khóa học"
            dataIndex="title"
            key="title"
            align="center"
          />
          <Column
            title="Mô tả"
            dataIndex="shortDescription"
            key="shortDescription"
            align="center"
          />
          <Column
            title="Danh mục"
            dataIndex="categoryId"
            key="categoryName"
            align="center"
            render={(text, row) => (
              <p>{categoryNameList[row.categoryId]}</p>
            )}
            
          />
          <Column
            title="Gỡ bỏ"
            key="action"
            align="center"
            render={(text, row) => (
              <Popconfirm
                title="Bạn có chắc là muốn gỡ bỏ khóa học này không?"
                onConfirm={() => handleDeleteCourse(row)}
                okText="Có"
                cancelText="Không"
              >
                <Button
                  type="danger"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  title="Xoá"
                />
              </Popconfirm>
            )}
          />
        </Table>
      </Card>
    </div>
  );
};

const mapState = (state) => ({
  categories: state.category.categories,
});
const mapDispatch = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapState, mapDispatch)(ListCourse);
