import React from "react";
import { Row, Col, Rate, Button} from 'antd'
import './styles.scss'

export default function CourseItem({
 item, isWatchList 
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
            { isWatchList && (<Button className="btn-remove-courses" type='danger'>
              Remove
            </Button>) }
            
          </div>
         
        </Col>
      </Row>
    </div>
  );
}
