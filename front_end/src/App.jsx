import React, {useEffect} from 'react';
import RouterOutlet from './routers';
import { ConfigProvider } from 'antd';
import { getProfile } from './stores/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'antd/dist/antd.css'
import './App.scss';

function App(props) {

  useEffect(()=>{
    if (localStorage && localStorage.getItem('access_token')) {
      props.getProfile({
        onSuccess: () => {
          localStorage.setItem("isAuthenticated", true)
        },
        onFailure: () => {
          localStorage.setItem("isAuthenticated", false)
        }
      });
    } else {
    //  props.toggleGlobalLoading(false);
    }
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
  getProfile
}, dispatch)
export default connect(mapState, mapDispatch)(App);
