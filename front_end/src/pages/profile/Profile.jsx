import React, { useState } from 'react';
import { Form, Input, Button, Radio, Row, Col } from 'antd';
import './styles.scss'

export default function Profile() {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: { span: 14, offset: 4 },
        }
      : null;
  const [isEdit, setIsEdit] = useState(false);
  
  const onFinish = (values) => {
    console.log("profile", values)
  }

  return (
  <>

    <Row>
      <Col span={4}></Col>
        <Col span={16} >
        <h1 className="title-page">Thong tin tai khoan</h1>
        <Form
        {...formItemLayout}
        // layout={formLayout}
        onSubmit={onFinish} 
      >
        <Form.Item label="Email" >
          <Input placeholder="example@gmail.com" disabled={!isEdit}  />
        </Form.Item>
        <Form.Item label="Ho ten">
          <Input placeholder="Nguyen Van A" disabled={!isEdit}/>
        </Form.Item>
        <Form.Item label="Mat khau">
          <Input placeholder="123456**" type="password" disabled={!isEdit}/>
        </Form.Item>
        {isEdit ? 
        (<Form.Item {...buttonItemLayout}>
          <Button type="primary">Submit</Button>
        </Form.Item>) : 
        (<Form.Item {...buttonItemLayout}>
          <Button type="primary" onClick={() => setIsEdit(!isEdit)} >Edit</Button>
        </Form.Item>)
        }

      </Form>
        </Col>
        <Col span={4}></Col>
      </Row>
    </>
  )
}
