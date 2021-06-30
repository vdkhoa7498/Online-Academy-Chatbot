import React, { Suspense, useState } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
  Link
} from "react-router-dom";
import { Layout, Menu } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PrivateRoute } from "./privateRoute";
import './styles.scss'

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TeamOutlined,
  AppstoreOutlined,
  BookOutlined,
  SolutionOutlined
} from '@ant-design/icons';

import HeaderBar from "../components/headerBar/HeaderBar";
import HeaderMenu from "../components/headerMenu/HeaderMenu";

import Home from "../pages/home/Home";
import NotFound from "../pages/notFound/NotFound";
import Register from "../pages/authentication/register/Register";
import Login from "../pages/authentication/login/Login";
import ForgetPassword from "../pages/authentication/fogetPassword/ForgetPassword";
import CourseDetail from "../pages/courseDetail/CourseDetail";
import CourseListCategory from "../pages/courseListCategory/CourseListCategory";
import Watchlist from "../pages/watchList/Watchlist";
import Profile from '../pages/profile/Profile';
import PostCourse from '../pages/postCourse/PostCourse';

import Categories from "../pages/admin/categories";
import Course from "../pages/admin/courses";
import Student from "../pages/admin/students";
import Lecturer from "../pages/admin/lecturers";

const { Header, Content, Footer, Sider } = Layout;

function RouteLayout(props) {
  const { children } = props;

  return (
    <Layout className="private-layout-container">
      <Header className="header">
        <HeaderBar />
      </Header>
      <HeaderMenu />
      <Content style={{ padding: "0 24px", minHeight: 380 }}>
        {children}
      </Content>
      <Footer style={{ textAlign: "center" }}>Website Learning @2021</Footer>
    </Layout>
  );
}

function AdminRouteLayout(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [menuIndex, setMenuIndex] = useState(1)

  return (
    <Layout className="private-layout-container">
      <Header className="header">
        <HeaderBar />
      </Header>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" onClick={(value) => { setMenuIndex(value.key); console.log(menuIndex) }} defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/admin/categories">
                <AppstoreOutlined />
                <span>Danh mục</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/admin/courses">
                <BookOutlined />
                <span>Khóa học</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/admin/students">
                <TeamOutlined />
                <span>Học viên</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/admin/lecturers">
                <SolutionOutlined />
                <span>Giảng viên</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 15, display: "flex", }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => { setCollapsed(!collapsed) },
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 500,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>

    </Layout>
  );
}

function RouterOutlet(props) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const { ...rest } = props;
  rest.isAuthenticated = isAuthenticated;

  return (
    <Suspense fallback={null}>
      <Router>
        <Switch>
          <Route exact path="/register">
            {
              (!isAuthenticated)
                ? <Register />
                : <Redirect to="/" />
            }
          </Route>
          <Route exact path="/login">
            {
              (!isAuthenticated)
                ? <Login />
                : <Redirect to="/" />
            }
          </Route>
          <Route exact path="/forget-password">
            <ForgetPassword />
          </Route>
          <Route
            exact
            path={["/", "/courses/:id", "/categories/:id", "/watchlist", "/user/profile", "/courses/post"]}
          >
            <RouteLayout {...rest}>
              <Switch>
                <Route exact path="/" {...rest}>
                  <Home />
                </Route>
                <Route exact path="/courses/post">
                  <PostCourse />
                </Route>
                <Route exact path="/courses/:id">
                  <CourseDetail />
                </Route>
                <Route exact path="/categories/:id">
                  <CourseListCategory />
                </Route>
                <Route exact path="/watchlist">
                  <Watchlist />
                </Route>
                <Route exact path='/user/profile'>
                  <Profile />
                </Route>
              </Switch>
            </RouteLayout>
          </Route>
          <Route
            exact
            path={["/admin/categories", "/admin/courses", "/admin/students", "/admin/lecturers"]}
          >
            <AdminRouteLayout>
              <Switch>
                <Route exact path="/admin/categories" component={Categories} />
              </Switch>
              <Switch>
                <Route exact path="/admin/courses" component={Course} />
              </Switch>
              <Switch>
                <Route exact path="/admin/students" component={Student} />
              </Switch>
              <Switch>
                <Route exact path="/admin/lecturers" component={Lecturer} />
              </Switch>
            </AdminRouteLayout>
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
}

const mapState = (state) => ({
  user: state.auth.user
});
const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      //
    },
    dispatch
  );

export default connect(mapState, mapDispatch)(RouterOutlet);
