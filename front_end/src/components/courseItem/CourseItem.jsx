import React from "react";
import { Row, Col, Rate, Button } from "antd";
import { Link } from "react-router-dom";

import "./styles.scss";

export default function CourseItem({ item, isWatchList, onRemoveCourse }) {
  const { title, category, lecturer, numberOfRate, rateScore } = item;
  console.log("Number of courses", item);

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
                <span className="value">{category}</span>
              </div>
              <div className="content-detail">
                <span className="title">Giảng Viên:</span>
                <span className="value">{lecturer}</span>
              </div>
              <div className="content-detail">
                <span className="title">Đánh giá:</span>
                <Rate allowHalf value={rateScore} disabled /> {numberOfRate}{" "}
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
