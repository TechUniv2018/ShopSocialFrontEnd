import React from 'react';
import Menu from './Menu/Menu';
import Consolebody from './Consolebody/Consolebody';
import './Adminconsole.css';


class Adminconsole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: 'yes',

    };
  }
  render() {
    if (this.state.isAuthenticated === 'yes') {
      return (
        <div>
          <Menu isAuthenticated={this.state.isAuthenticated} />
          <Consolebody />
        </div>
      );
    }

    return (
      <div>
        <Menu isAuthenticated={this.state.isAuthenticated} />
        <center> Please Login </center>
      </div>
    );
  }
}

export default Adminconsole;
