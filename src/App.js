import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Adminconsole from './Components/Adminconsole/Adminconsole';
import ProductDisplay from './Components/ProductDisplay/ProductDisplay';
import TestPage from './Components/TestComponents/TestPage';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={TestPage} />
        <Route exact path="/admin" component={Adminconsole} />
        <Route path="/showProduct" component={ProductDisplay} />
      </Switch>
    );
  }
}

export default App;
