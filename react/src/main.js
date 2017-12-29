import React from "react";
import ReactDOM from "react-dom";
import Demo from './component'
import { Button } from 'element-react';
// import 'antd/dist/antd.css';
import 'antd/dist/antd.less';
// import 'element-theme-default';


class Index extends React.Component {
  render() {
    return (
      <div>
        <Demo /> 
        { /* <img src="common/img/new.jpg" /> */ } 
        <Button type="primary">Hello</Button>
      </div>
    )
  }
}

ReactDOM.render(<Index /> , document.getElementById("root"));