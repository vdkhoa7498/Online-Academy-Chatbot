import React from "react";
import { Row, Col, Rate, Button} from 'antd'
import { Link } from 'react-router-dom'

import './styles.scss'

export default function CourseItem({
 item, isWatchList, onRemoveCourse 
}) {
  const {
    title,
    category,
    lecturer,
    numberOfRate,
    rateScore
  } = item;


  return (
    <div>
      <Link to={`/courses/${item.id}`}>
      <Row className="list-container">
        <Col span={8}>
          <img className="image-item" alt={item.title} src={item.picture} />
        </Col>
        <Col span={14}>
          <div className="content-item">
            <div>
              <span className="title">Tên:</span>
              <span className="value">
              {title}
              </span>
            </div>
            <div>
              <span className="title">Thể Loại:</span>
              <span className="value">
              {category}
              </span>
            </div>
            <div>
              <span className="title">Giảng Viên:</span>
              <span className="value">
              {lecturer}
              </span>
            </div>
            <div>
              <span className="title">Đánh giá:</span>
              <Rate allowHalf value={rateScore} disabled /> {numberOfRate} Lượt
              đánh giá
            </div>
            { isWatchList && (<Button className="btn-remove-courses" type='danger' onClick={onRemoveCourse}>
              Remove
            </Button>) }
            
          </div>
         
        </Col>
      </Row>
      </Link>
      
    </div>
  );
}
