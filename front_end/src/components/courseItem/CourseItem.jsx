import React from "react";
import { Row, Col, Rate, Button} from 'antd'
import './styles.scss'

export default function CourseItem({
 item, isWatchList 
}) {
  const {title,
    category,
    lecturer,
    numberOfRate,
    price, rateScore} = item;

  console.log("isWatchList", isWatchList)
  return (
    <div>
      <Row className="list-container">
        <Col span={8}>
          <img className="image-item" alt={item.title} src={item.image} />
        </Col>
        <Col span={14}>
          <div className="content-item">
            <div>
              <span className="title">Tên:</span>
              {title}
            </div>
            <div>
              <span className="title">Thể Loại:</span>
              {category}
            </div>
            <div>
              <span className="title">Giảng Viên:</span>
              {lecturer}
            </div>
            <div>
              <span className="title">Đánh giá:</span>
              <Rate allowHalf value={rateScore} disabled /> {numberOfRate} Lượt
              đánh giá
            </div>
            <div>
              <span className="title">Giá:</span>
              {price} VND
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
