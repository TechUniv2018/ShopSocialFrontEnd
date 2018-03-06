import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Adminconsole from './Components/Adminconsole/Adminconsole';
import ProductDisplay from './Components/ProductDisplay/ProductDisplay';
import ProductCategory from './Components/ProductCategory/ProductCategory';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/admin" component={Adminconsole} />
        <Route path="/product" component={ProductDisplay} />
        <Route path="/category/:cgory" component={ProductCategory} />
      </Switch>
    );
  }
}

export default App;
