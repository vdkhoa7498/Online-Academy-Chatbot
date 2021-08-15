import React, {useEffect} from 'react';
import RouterOutlet from './routers';
import { ConfigProvider } from 'antd';
import { getProfile } from './stores/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'antd/dist/antd.css'
import './App.scss';
import { getMenu } from './stores/category';

function App(props) {

  useEffect(()=>{
    if (localStorage && localStorage.getItem('access_token')) {
      props.getProfile({
        onSuccess: () => {
          localStorage.setItem("isAuthenticated", true)
        },
        onFailure: () => {
          
        }
      });
    } else {
    //  props.toggleGlobalLoading(false);
    }
    props.getMenu()
  }, [])

  return (
    <div className="App">
      <ConfigProvider>
        <RouterOutlet/>
      </ConfigProvider>
    </div>
  );
}

const mapState = (state) => ({
  globalLoading: state.auth.globalLoading
});

const mapDispatch = dispatch => bindActionCreators({
  getProfile,
  getMenu
}, dispatch)
export default connect(mapState, mapDispatch)(App);
