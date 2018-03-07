import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Adminconsole from './Components/Adminconsole/Adminconsole';
import ProductDisplay from './Components/ProductDisplay/ProductDisplay';
import TestPage from './Components/TestComponents/TestPage';
import Home from './Components/Home/Home';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Adminconsole} />
        <Route path="/showProduct" component={ProductDisplay} />
      </Switch>
    );
  }
}

export default App;
