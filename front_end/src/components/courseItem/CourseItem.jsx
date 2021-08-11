import React, { useState, useEffect } from "react";
import { Row, Col, Rate, Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { httpClient } from "../../api";

import "./styles.scss";

function CourseItem({ item, isWatchList, onRemoveCourse, categories }) {
  const [lecturer, setLecturer] = useState({});
  const { title, categoryId, lecturerId, ratings, rateScore } = item;
  let categoryNameList = [];
  categories?.map((item) => {
    categoryNameList[item._id] = item.name;
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log(item)
      const lecturer_ = await httpClient.user.getUserById(lecturerId);
      setLecturer(lecturer_);
    };
    fetchData();
  }, [item]);

  return (
    <div>
      <Row className="list-container">
        <Col span={8}>
          <Link to={`/courses/${item.id}`}>
            <img className="image-item" alt={item.title} src={item.picture} />
          </Link>
        </Col>
        <Col span={14}>
          <div className="content-item">
            <Link to={`/courses/${item.id}`}>
              <div className="content-detail">
                <span className="title">Tên:</span>
                <span className="value">{title}</span>
              </div>
              <div className="content-detail">
                <span className="title">Thể Loại:</span>
                <span className="value">{categoryNameList[categoryId]}</span>
              </div>
              <div className="content-detail">
                <span className="title">Giảng Viên:</span>
                <span className="value">{lecturer.fullName}</span>
              </div>
              <div className="content-detail">
                <span className="title">Đánh giá:</span>
                <Rate allowHalf value={rateScore} disabled />{"  "}{ratings}{"  "}
                Lượt đánh giá
              </div>
            </Link>

            {isWatchList && (
              <Button
                className="btn-remove-courses"
                type="danger"
                onClick={onRemoveCourse}
              >
                Remove
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

const mapState = (state) => ({
  categories: state.category.categories,
});
const mapDispatch = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapState, mapDispatch)(CourseItem);
