import React, {useState} from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, UserAddOutlined } from '@ant-design/icons';
import Logo from '../../../assets/img/logo_128.png';
import './styles.scss';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'

const Register = (props) =>{

    let [form] = Form.useForm();
    const [isSuccess, setIsSuccess] = useState(false);

    let handleSubmit = (data) => {
        props.register(data.username, data.fullName, data.email, data.password)
        .then((value) => {
            // message.success('Đăng kí thành công. Bạn có thể đăng nhập ngay bây giờ !');
            setIsSuccess(true)
        })
        .catch((error) => {
            form.resetFields();
        });
    };


    return(
        <div className="register-page snap-padding">
            {
                (!isSuccess) ? (
                    <Form onFinish={handleSubmit} className="register-form" form={form}>
                        <img src={Logo} className="register-form__image" alt="admin" />
                        <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập email!',
                            whitespace: false
                          }
                        ]}
                      >
                        <Input
                          prefix={
                            <UserOutlined
                              style={{
                                color: 'rgba(0,0,0,.25)'
                              }}
                            />
                          }
                          placeholder="Email"
                          type="email"
                        />
                      </Form.Item>
                      <Form.Item
                        name="fullName"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập tên đầy đủ của bạn!',
                            whitespace: true
                          }
                        ]}
                      >
                        <Input
                          prefix={
                            <UserOutlined
                              style={{
                                color: 'rgba(0,0,0,.25)'
                              }}
                            />
                          }
                          placeholder="Tên của bạn"
                          maxLength="45"
                        />
                      </Form.Item>
                      
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!'
                          }
                        ]}
                        hasFeedback
                      >
                        <Input.Password
                          prefix={
                            <LockOutlined
                              style={{
                                color: 'rgba(0,0,0,.25)'
                              }}
                            />
                          }
                          placeholder="Mật khẩu"
                          maxLength="60"
                        />
                      </Form.Item>
                      <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu xác nhận!'
                          },
                          ({getFieldValue}) => ({
                            validator(rule, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
              
                              return Promise.reject('Mật khẩu xác nhận chưa khớp');
                            }
                          })
                        ]}
                      >
                        <Input.Password
                          prefix={
                            <LockOutlined
                              style={{
                                color: 'rgba(0,0,0,.25)'
                              }}
                            />
                          }
                          placeholder="Mật khẩu xác nhận"
                        />
                      </Form.Item>
                      <Form.Item className="register-form__link">
                          <span>Bạn đã có tài khoản? </span>
                          <Link to="/login">Login</Link>
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" className="register-form-button" icon={<UserAddOutlined/>}>
                          Đăng kí
                        </Button>
                      </Form.Item>
                    </Form>
                  ) : (
                    <Redirect to="/login" />
                  )
              
            }
        </div>

    )
}
const mapState = (state) => ({
});
const mapDispatch = dispatch => bindActionCreators({
}, dispatch)
export default connect(mapState, mapDispatch)(Register);