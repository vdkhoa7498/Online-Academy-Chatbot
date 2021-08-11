import React, { Suspense, useState } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
  Link,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./styles.scss";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TeamOutlined,
  AppstoreOutlined,
  BookOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

import HeaderBar from "../components/headerBar/HeaderBar";
import HeaderMenu from "../components/headerMenu/HeaderMenu";

import Home from "../pages/home/Home";
import NotFound from "../pages/notFound/NotFound";
import Register from "../pages/authentication/register/Register";
import Login from "../pages/authentication/login/Login";
import ChangePassword from "../pages/authentication/changePassword/ChangePassword";
import ForgetPassword from "../pages/authentication/fogetPassword/ForgetPassword";
import CourseDetail from "../pages/courseDetail/CourseDetail";
import CourseListCategory from "../pages/courseListCategory/CourseListCategory";
import WatchList from "../pages/watchList/Watchlist";
import Profile from "../pages/profile/Profile";
import Learning from "../pages/Leaning/Learning";
import MyCourses from "../pages/myCourses/MyCourses";

import Categories from "../pages/admin/categories";
import Course from "../pages/admin/courses";
import Student from "../pages/admin/students";
import Lecturer from "../pages/admin/lecturers";
import SearchList from "../pages/searchList/SearchList";

import AdminRoute from "./AdminRoute";
import StudentRoute from "./StudentRoute";
import LecturerRoute from "./LecturerRoute";
import PrivateRoute from "./privateRoute";

import ListCourse from "../pages/lecturer/listCourse/ListCourse";
import PostCourse from "../pages/lecturer/postCourse/PostCourse";
import EditCourse from "../pages/lecturer/editCourse/EditCourse";

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
  const [menuIndex, setMenuIndex] = useState(1);

  return (
    <Layout className="private-layout-container">
      <Header className="header">
        <HeaderBar />
      </Header>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            onClick={(value) => {
              setMenuIndex(value.key);
              console.log(menuIndex);
            }}
            defaultSelectedKeys={["1"]}
          >
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
          <Header
            className="site-layout-background"
            style={{ padding: 15, display: "flex" }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => {
                  setCollapsed(!collapsed);
                },
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 775,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

function LecturerRouteLayout(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [menuIndex, setMenuIndex] = useState(1);

  return (
    <Layout className="private-layout-container">
      <Header className="header">
        <HeaderBar />
      </Header>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            onClick={(value) => {
              setMenuIndex(value.key);
              console.log(menuIndex);
            }}
            defaultSelectedKeys={["1"]}
          >
            <Menu.Item key="1">
              <Link to="/lecturer/my-courses">
                <AppstoreOutlined />
                <span>Khoá học của tôi</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/lecturer/create-new-course">
                <BookOutlined />
                <span>Tạo khoá học mới</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: 15, display: "flex" }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => {
                  setCollapsed(!collapsed);
                },
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 775,
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
            {!isAuthenticated ? <Register /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/login">
            {!isAuthenticated ? <Login /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/forget-password">
            <ForgetPassword />
          </Route>
          <Route exact path="/change-password">
            <ChangePassword />
          </Route>

          <Route
            exact
            path={[
              "/",
              "/courses/:id",
              "/categories/:id",
              "/courses/category/:categoryId",
              "/courses/learning/:id",
              "/profile",
              "/search",
            ]}
          >
            <RouteLayout {...rest}>
              <Switch>
                <Route exact path="/" {...rest}>
                  <Home />
                </Route>
                <Route exact path="/search">
                  <SearchList />
                </Route>
                <Route exact path="/courses/:id">
                  <CourseDetail />
                </Route>
                <Route exact path="/courses/category/:categoryId">
                  <CourseListCategory />
                </Route>
                <Route exact path="/courses/learning/:id">
                  <Learning />
                </Route>
                <Route exact path="/categories/:id">
                  <CourseListCategory />
                </Route>
                <PrivateRoute exact path="/profile">
                  <Profile />
                </PrivateRoute>
              </Switch>
            </RouteLayout>
          </Route>

          <StudentRoute exact path={["/watch-list", "/my-courses"]}>
            <RouteLayout {...rest}>
              <Switch>
                <Route exact path="/watch-list" component={WatchList} />
                <Route exact path="/my-courses" component={MyCourses} />
              </Switch>
            </RouteLayout>
          </StudentRoute>

          <LecturerRoute
            exact
            path={["/lecturer/create-new-course", "/lecturer/my-courses", "/lecturer/edit-my-course/:courseId"]}
          >
            <LecturerRouteLayout>
              <Switch>
                <Route exact path="/lecturer/create-new-course">
                  <PostCourse />
                </Route>
                <Route exact path="/lecturer/my-courses">
                  <ListCourse />
                </Route>
                <Route exact path="/lecturer/edit-my-course/:courseId">
                  <EditCourse/>
                </Route>
              </Switch>
            </LecturerRouteLayout>
          </LecturerRoute>

          <AdminRoute
            exact
            path={[
              "/admin/categories",
              "/admin/courses",
              "/admin/students",
              "/admin/lecturers",
            ]}
          >
            <AdminRouteLayout>
              <Switch>
                <Route exact path="/admin/categories" component={Categories} />
                <Route exact path="/admin/courses" component={Course} />
                <Route exact path="/admin/students" component={Student} />
                <Route exact path="/admin/lecturers" component={Lecturer} />
              </Switch>
            </AdminRouteLayout>
          </AdminRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
}

const mapState = (state) => ({
  user: state.auth.user,
});
const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      //
    },
    dispatch
  );

export default connect(mapState, mapDispatch)(RouterOutlet);
