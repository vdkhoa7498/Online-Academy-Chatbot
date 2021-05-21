import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PrivateRoute } from './privateRoute';

import HeaderBar from '../components/headerBar/HeaderBar'
import HeaderMenu from '../components/headerMenu/HeaderMenu'

import Home from '../pages/home/Home';
import NotFound from '../pages/notFound/NotFound'
import Login from '../pages/authentication/login/Login'
import CourseDetail from '../pages/courseDetail/CourseDetail';

const { Header, Content, Footer } = Layout;

function RouteLayout(props) {
  const { children } = props;

  return (
    <Layout className="private-layout-container">
        <Header className="header">
          <HeaderBar/>
        </Header>
        <HeaderMenu/>
        <Content style={{ padding: '0 24px', minHeight: 380 }}>
            {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Website Learning @2021</Footer>
    </Layout>
  )
}
function RouterOutlet(props) {
  const isAuthenticated = localStorage.getItem("isAuthenticated")
  const { ...rest} = props;
  rest.isAuthenticated = isAuthenticated;

  return (
    <Suspense fallback={null}>
      <Router>
        <Switch>
            <Route exact path="/login">
                {
                  isAuthenticated  ? (
                    <Redirect to="/" />
                  ) : (
                    <Login />
                  )
                }
            </Route>
          <Route exact path={["/", "/home", "/courses/:id"]}>
            <RouteLayout {...rest}>
              <Switch>
                <Route exact path ="/" {...rest}>
                  <Home/>
                </Route>
                <Route exact path ="/courses/:id">
                  <CourseDetail/>
                </Route>
              </Switch>
            </RouteLayout>
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </Suspense>
  )
}

const mapState = (state) => ({
  
});
const mapDispatch = dispatch => bindActionCreators({
  //
}, dispatch)

export default connect(mapState, mapDispatch)(RouterOutlet);
