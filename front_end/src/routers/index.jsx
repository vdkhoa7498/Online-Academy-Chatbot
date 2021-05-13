import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PrivateRoute } from './privateRoute';
import './styles.scss'

import Home from '../pages/home/Home';
import NotFound from '../pages/notFound/NotFound'
import Login from '../pages/authentication/login/Login'

const { Header, Content, Footer } = Layout;

function PrivateLayout(props) {
  const { children } = props;

  return (
    <Layout className="private-layout-container">
        <Header className="header">
            <div className="logo"></div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
        </Header>
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
          <Route exact path={["/", "/home"]}>
            <PrivateLayout {...rest}>
              <Switch>
                <PrivateRoute exact path ="/" {...rest}>
                  <Home/>
                </PrivateRoute>
                <PrivateRoute exact path="/home" {...rest}>
                  <Home />
                </PrivateRoute>
                
              </Switch>
            </PrivateLayout>
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
