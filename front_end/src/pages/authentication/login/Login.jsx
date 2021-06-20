import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import Logo from "../../../assets/img/logo_128.png";
import "./styles.scss";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  login,
  clearAuthMessage,
  loginWithGoogle,
  loginWithFacebook,
} from "../../../stores/auth";
import { toggleAuthModal } from "../../../stores/auth/action";
import { Link, useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();

  const onFinish = (values) => {
    const form = { ...values };
    props.login({
      form,
      onSuccess: (model) => {
        message.success(`Welcome, ${model.fullName}!`);
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

  const responseGoogle = (response) => {
    props.loginWithGoogle({
      tokenId: response.tokenId,
      onSuccess: (model) => {
        message.success(`Welcome, ${model.fullName}!`);
        history.push("/");
      },
      onFailure: (error) => {
        console.log(error);
      },
    });
  };

  const responseFacebook = ({ accessToken, userID }) => {
    console.log({ accessToken, userID });
    props.loginWithFacebook({
      userInfoLogin: { accessToken, userId: userID },
      onSuccess: (model) => {
        message.success(`Welcome, ${model.fullName}!`);
        history.push("/");
      },
      onFailure: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div className="login-page snap-padding">
      <Form onFinish={onFinish} className="login-form">
        <Link to="/">
          <img src={Logo} className="login-form__image" alt="Online Learning" />
        </Link>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            autoComplete="email"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            autoComplete="current-password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item className="login-form__link">
          <Link to="/register">Register</Link>
          <Link to="/forget-password">Forget Password</Link>
        </Form.Item>
        <div style={{ color: "red", marginBottom: 15 }}>{props.message}</div>
        <Form.Item>
          <Button className="btn-submit" type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        <GoogleLogin
          clientId="1027836292196-23jb4mhdloh2pas4t8b7ab8fmfe60cdj.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <FacebookLogin
          appId="501324381076690"
          autoLoad={false}
          callback={responseFacebook}
        />
        , ,
      </Form>
    </div>
  );
};
const mapState = (state) => ({
  loading: state.auth.loading,
  message: state.auth.message,
});
const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      login,
      clearAuthMessage,
      loginWithGoogle,
      loginWithFacebook,
      toggleAuthModal,
    },
    dispatch
  );
export default connect(mapState, mapDispatch)(Login);
