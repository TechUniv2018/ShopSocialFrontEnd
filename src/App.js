import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Adminconsole from './Components/Adminconsole/Adminconsole';
import ProductDisplay from './Components/ProductDisplay/ProductDisplay';
import RegisterLoginModal from './Components/RegisterLoginModal/RegisterLoginModal';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/admin" component={Adminconsole} />
        <Route path="/showProduct" component={ProductDisplay} />
        <Route path="/login" component={RegisterLoginModal} />
      </Switch>
    );
  }
}

export default App;
