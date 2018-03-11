import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Well } from 'react-bootstrap';
import MenuMain from '../MenuMain/MenuMain';
import FooterMain from './FooterMain/FooterMain';
import './Home.css';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: 'no',
    };
  }
  render() {
    return (
      <div className="Home">
        <MenuMain isAuthenticated={this.state.isAuthenticated} />
        <div className="HomeBodyImage" />
        <div className="HomeCategories">
          <Well>
            <Grid>
              <Row className="show-grid">
                <Col sm={6} md={3}>
                  <div className="CategoryTv">A</div>
                  <Link to="/category/TVs" className="AddToCart" />
                </Col>
                <Col sm={6} md={3}>
                  <div className="CategoryDvd">A</div>
                  <Link to="/category/DVD Players" className="AddToCart" />
                </Col>
                <Col sm={6} md={3}>
                  <div className="CategoryFurn">A</div>
                  <Link to="/category/TV & Home Theater" className="AddToCart" />
                </Col>
                <Col sm={6} md={3}>
                  <div className="CategoryAudio">A</div>
                  <Link to="/category/Audio" className="AddToCart" />
                </Col>
              </Row>
            </Grid>
          </Well>
        </div>
        <div className="HomeAbout">
          <div className="HomeAboutTitle"> ShopSocial </div>
          <div className="HomeAboutText">
               Online shopping is often a solitary
               activity, unlike shopping in a brick and
               mortar store, where people have a choice of going shopping together with others.
               Welcome to ShopSocial where you can get together with your friends and family
               across  the planet and shop as if your shopping companion were right next to you!
          </div>
        </div>
        <FooterMain />
      </div>
    );
  }
}

export default Home;
