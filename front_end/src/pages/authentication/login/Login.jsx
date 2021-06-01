import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Logo from '../../../assets/img/logo_128.png';
import './styles.scss';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, clearAuthMessage } from '../../../stores/auth';
import { toggleAuthModal } from '../../../stores/auth/action';
import { Link } from 'react-router-dom'

const Login = (props) =>{

    const onFinish = (values) =>{
        console.log(values)
    }

    return(
        <div className="login-page snap-padding">
            <Form
                onFinish={onFinish} 
                className="login-form"
            >
                <Link to="/">
                    <img src={Logo} className="login-form__image" alt="Online Learning" />
                </Link>
                <Form.Item
                    name="email"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input 
                        autoComplete="email"
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password 
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        autoComplete="current-password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item className="login-form__link">
                    <Link to="/register">Register</Link>
                    <Link to="/forget-password">Forget Password</Link>
                </Form.Item>
                <Form.Item>
                    <Button className="btn-submit" type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>

        </div>

    )
}
const mapState = (state) => ({
    loading: state.auth.loading,
    message: state.auth.message,
});
const mapDispatch = dispatch => bindActionCreators({
    login,
    clearAuthMessage,
    toggleAuthModal
}, dispatch)
export default connect(mapState, mapDispatch)(Login);