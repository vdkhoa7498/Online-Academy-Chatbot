import React, { useState, useEffect, useSelector } from 'react';
import { Form, Input, Button, Radio, Row, Col } from 'antd';
import toastr from 'toastr';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getProfile, editProfile } from '../../stores/auth';


import './styles.scss'


const Profile = ({ user, getProfile, editProfile }) => {
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

  useEffect(()=>{
    if (localStorage && localStorage.getItem('access_token')) {
      getProfile({
        onSuccess: () => {
          localStorage.setItem("isAuthenticated", true)
        },
        onFailure: () => {
          
        }
      });
    } else {
    //  props.toggleGlobalLoading(false);
    }

  }, [])


  const onFinish = (values) => {
    const newUser = { email: user.email, fullName: values.fullName};
    editProfile({
      form: newUser,
      onSuccess: () => {
        toastr.success("Edit successful");
      },
      onFailure: () => {
        toastr.error("Edit fail");
      }
    })
    setIsEdit(false);
  }



  return (
  <>

    <Row>
      <Col span={4}></Col>
        <Col span={16} >
        <h1 className="title-page">Thông tin tài khoản</h1>
        <Form
        {...formItemLayout}
        // layout={formLayout}
        onFinish={onFinish} 
      >
        {/* <Form.Item label="Email" name="email" initialValue={ user ? user.email : ''}>
          <Input placeholder="example@gmail.com" disabled={!isEdit}   />
        </Form.Item> */}
        <Form.Item label="Họ tên" name="fullName" initialValue={ user ? user.fullName: ''}>
          <Input placeholder="Nguyen Van A" disabled={!isEdit}/>
        </Form.Item>
        {isEdit ? 
        (<Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>) : 
        (<Form.Item {...buttonItemLayout}>
          <Button type="primary" onClick={(e) => {e.preventDefault();setIsEdit(!isEdit)}} >Edit</Button>
        </Form.Item>)
        }

      </Form>
        </Col>
        <Col span={4}></Col>
      </Row>
    </>
  )
}

const mapState = (state) => ({
  loading: state.auth.loading,
  user: state.auth.user,
});
const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
       getProfile,
       editProfile
    },
    dispatch
  );
export default connect(mapState, mapDispatch)(Profile);

