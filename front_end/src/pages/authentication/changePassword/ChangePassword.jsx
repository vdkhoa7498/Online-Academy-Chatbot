import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { changePassword, clearAuthMessage } from "../../../stores/auth";
import { UserOutlined, LockOutlined, UserAddOutlined } from "@ant-design/icons";
import Logo from "../../../assets/img/logo_128.png";
import "./styles.scss";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect, Link, useHistory } from "react-router-dom";

const ChangePassword = (props) => {
  let [form] = Form.useForm();
  const history = useHistory();

  const onFinish = (data) => {
    const form = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    props.changePassword({
      form,
      onSuccess: (model) => {
        message.success(
          "Đổi mật khẩu thành công.!"
        );
        history.push("/");
      },
      onFailure: (error) => {
        message.error(error.message);
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
        {/* <Form.Item
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
        </Form.Item> */}
        <Form.Item
          name="oldPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu cũ!",
              whitespace: true,
            },
          ]}
        >
          <Input.Password
            prefix={
              <UserOutlined
                style={{
                  color: "rgba(0,0,0,.25)",
                }}
              />
            }
            placeholder="Mật khẩu cũ"
            maxLength="45"
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu mới!",
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
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu xác nhận!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("newPassword") === value) {
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
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
            icon={<UserAddOutlined />}
          >
            Đổi mật khẩu
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
      changePassword,
      clearAuthMessage,
    },
    dispatch
  );
export default connect(mapState, mapDispatch)(ChangePassword);
