import React from 'react';
// import { Image, Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import MenuMain from './MenuMain/MenuMain';
import FooterMain from './FooterMain/FooterMain';
// import Consolebody from './Consolebody/Consolebody';
import './Home.css';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: 'yes',

    };
  }
  render() {
    if (this.state.isAuthenticated === 'yes') {
      return (
        <div className="Home">
          <MenuMain isAuthenticated={this.state.isAuthenticated} />
          <div className="imagecar" />
          {/* <Image src="./home.jpg" responsive />; */}
          <div className="HomeCategories">
            <div className="HomeProduct" />
            <div className="HomeProduct" />
            <div className="HomeProduct" />
            <div className="HomeProduct" />
          </div>
          <div className="HomeAbout">
            <div className="HomeAboutTitle"> ShopSocial </div>
            <div className="HomeAboutText">
              <p className="HomeAboutTextP">
                Online shopping is often a solitary
              activity, unlike shopping in a brick and
               mortar store, where people have a choice of going shopping together with others.
               Welcome to ShopSocial where you can get together with your friends and family
               across  the planet and shop as if your shopping companion were right next to you!
              </p>
            </div>
          </div>
          <FooterMain />
        </div>
      );
    }

    return (
      <div>
        <MenuMain isAuthenticated={this.state.isAuthenticated} />
        <center> Please Login </center>
      </div>
    );
  }
}

export default Home;
