import { UserOutlined ,UserAddOutlined} from '@ant-design/icons';
import { Form, Input, Result,Button,message} from 'antd';
import Logo from '../../../assets/img/logo_128.png';
import React, {useState} from 'react';
import './styles.scss'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function ForgetPassword(props) {
  let [form] = Form.useForm();
  const [isSuccess, setIsSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  let handleSubmit = (data) => {
    setLoading(true)
    props.forgetPassword(data.email)
      .then((res) => {
        setLoading(false)
        //console.log(res)
        if (res.data === false) {
          message.error('Vui lòng nhập đúng email');
        } else {
          setIsSuccess(true);
        }
      })
      .catch(() => {
        setLoading(false)
        message.error('Có lỗi xảy ra');
      });
  };
  return (
    <div className="forgetPassword-page">
        {
            (!isSuccess) ? (
                <Form onFinish={handleSubmit} className="forgetPassword-form" form={form}>
                  <Link to="/">
                    <img src={Logo} className="forgetPassword-form__image" alt="admin" />
                  </Link>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập email của bạn!',
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
                      maxLength="30"
                    />
                  </Form.Item>
                  <Form.Item className="forgetPassword-form__link">
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                   </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="forgetPassword-form-button" icon={<UserAddOutlined/>} loading={loading} >
                        Đổi mật khẩu
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                <Result
                  status="success"
                  title="Đã gửi mail cho tài khoản !"
                  subTitle="Hệ thống đã gửi mail cho bạn, mời bạn kiểm tra mail để hoàn thành."
                />
              )
        }
    </div>
    
  );
}
const mapState = (state) => ({
});
const mapDispatch = dispatch => bindActionCreators({
}, dispatch)
export default connect(mapState, mapDispatch)(ForgetPassword);