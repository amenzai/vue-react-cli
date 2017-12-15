import React from "react";
import ReactDOM from "react-dom";
import Demo from './component'

class Index extends React.Component {
  render() {
    return (
      <div>
        <Demo />
      </div>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));