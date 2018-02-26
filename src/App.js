import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Adminconsole from './Components/Adminconsole/Adminconsole';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/admin" component={Adminconsole} />
      </Switch>
    );
  }
}

export default App;
