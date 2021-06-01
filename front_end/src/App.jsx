import React from 'react';
import RouterOutlet from './routers';
import { ConfigProvider } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'antd/dist/antd.css'
import './App.scss';

function App() {
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
  
}, dispatch)
export default connect(mapState, mapDispatch)(App);
