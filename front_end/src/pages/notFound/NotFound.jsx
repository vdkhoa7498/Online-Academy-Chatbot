import React from 'react';
import { Button, Row, Col } from 'antd'
import { Link } from "react-router-dom";
import imageNotFound from "../../assets/img/404.svg";
import './styles.scss'

export default function NotFound() {
  return (
    <Row className="not-found-container">
      <Col xl={12} xs={24} className="img">
          <img alt="Not Found" src={imageNotFound}/>
      </Col>
      <Col xl={12} xs={24} className="content">
        <h1>UH OH! Có gì đó sai sai.</h1>
        <br/>
        <p>Trang bạn đang tìm kiếm không tồn tại. Làm thế nào bạn có được ở đây là một bí ẩn. Nhưng bạn có thể nhấp vào nút bên dưới để quay lại trang chủ.
        </p>
        <br/>
        <Link to ="/">
            <Button type="ghost" >HOME</Button>
        </Link>
      </Col>
    </Row>
  )
}
