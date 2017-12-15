'use strict';
import React from "react";
import qq from "./common/img/new.jpg";
// import { Button } from 'antd';
// import 'antd/dist/antd.css';
import './common/less/app.less';
export default class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '测试react'
    }
  }
  render() {

    return (
      <div>
        <h1>{this.state.title}</h1>
        <img src={qq} />
        <p></p>
        {/* <Button type="primary">Primary</Button> */}
      </div>
    )
  }
}