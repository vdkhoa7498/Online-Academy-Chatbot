import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { register, clearAuthMessage } from "../../../stores/auth";
import { UserOutlined, LockOutlined, UserAddOutlined } from "@ant-design/icons";
import Logo from "../../../assets/img/logo_128.png";
import "./styles.scss";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect, Link, useHistory } from "react-router-dom";
import { httpClient } from "../../../api";

const Register = (props) => {
  let [form] = Form.useForm();
  const history = useHistory();
  const [isValidateOtp, setIsValidateOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [sentOtp, setSentOtp] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const sendOtp = async () => {
    setCountdown(60);
    await httpClient.auth.sendOtp({ email });
    setSentOtp(true);
  };

  const validateOtp = async (otp) => {
    console.log({ email, otp });
    if (otp.length === 6) {
      const res = await httpClient.auth.validateOtp({ email, otp });
      if (res) {
        setIsValidateOtp(true);
      }
    }
  };
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  const onFinish = (data) => {
    const form = {
      email: data.email,
      fullName: data.fullName,
      password: data.password,
    };
    props.register({
      form,
      onSuccess: (model) => {
        message.success(
          "Đăng kí thành công. Bạn có thể đăng nhập ngay bây giờ !"
        );
        history.push("/");
      },
      onFailure: (error) => {
        console.log(error);
      },
    });
  };

  useEffect(() => {
    return props.clearAuthMessage();
  }, []);
  return (
    <div className="register-page snap-padding">
      <Form onFinish={onFinish} className="register-form" form={form}>
        <Link to="/">
          <img
            src={Logo}
            className="register-form__image"
            alt="Online Learning"
          />
        </Link>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email!",
              whitespace: false,
            },
          ]}
        >
          <Input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            prefix={
              <UserOutlined
                style={{
                  color: "rgba(0,0,0,.25)",
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
              message: "Vui lòng nhập tên đầy đủ của bạn!",
              whitespace: true,
            },
          ]}
        >
          <Input
            prefix={
              <UserOutlined
                style={{
                  color: "rgba(0,0,0,.25)",
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
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={
              <LockOutlined
                style={{
                  color: "rgba(0,0,0,.25)",
                }}
              />
            }
            placeholder="Mật khẩu"
            maxLength="60"
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu xác nhận!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject("Mật khẩu xác nhận chưa khớp");
              },
            }),
          ]}
        >
          <Input.Password
            prefix={
              <LockOutlined
                style={{
                  color: "rgba(0,0,0,.25)",
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
        <div style={{ color: "red", marginBottom: 15 }}>{props.message}</div>
        <div style={{ display: "flex", marginTop: 5, marginBottom: 10 }}>
          <Input
            placeholder="Nhập OTP"
            onChange={async (event) => {
              await validateOtp(event.target.value);
            }}
          />
          <Button
            disabled={(!email || isValidateOtp) ? true : false}
            onClick={sendOtp}
            style={{ marginLeft: 5 }}
          >
            {sentOtp ? "Resend " : "Send "}
          </Button>
          {sentOtp && (
            <div style={{ marginLeft: 5, marginTop: 3, fontWeight: "bold" }}>
              {countdown}
            </div>
          )}
        </div>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
            disabled={!isValidateOtp}
            icon={<UserAddOutlined />}
          >
            Đăng kí
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
const mapState = (state) => ({
  message: state.auth.message,
});
const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      register,
      clearAuthMessage,
    },
    dispatch
  );
export default connect(mapState, mapDispatch)(Register);
