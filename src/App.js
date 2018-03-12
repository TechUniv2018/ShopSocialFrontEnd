import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Adminconsole from './Components/Adminconsole/Adminconsole';
import ProductDisplay from './Components/ProductDisplay/ProductDisplay';
import RegisterLoginModal from './Components/RegisterLoginModal/RegisterLoginModal';
import TestPage from './Components/TestComponents/TestPage';
import Home from './Components/Home/Home';
import ProductCategory from './Components/ProductCategory/ProductCategory';
import MenuMain from '../src/Components/MenuMain/MenuMain';

class App extends Component {
  render() {
    return (
      <div>
        <MenuMain />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin" component={Adminconsole} />
          <Route path="/product" component={ProductDisplay} />
          <Route path="/category/:cgory" component={ProductCategory} />
          <Route path="/login" component={RegisterLoginModal} />
          <Route path="/test" component={TestPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
