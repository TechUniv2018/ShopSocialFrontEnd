import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import FooterMain from './FooterMain/FooterMain';
import './Home.css';


class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="HomeBodyImage" />
        <div className="HomeCategories">
          <Grid>
            <Row className="show-grid">
              <Col sm={6} md={3}>
                <div className="CategoryTv"><Link to="/category/TVs" className="AddToCart" /></div>
              </Col>
              <Col sm={6} md={3}>
                <div className="CategoryDvd"><Link to="/category/DVD Players" className="AddToCart" /></div>
              </Col>
              <Col sm={6} md={3}>
                <div className="CategoryFurn"><Link to="/category/TV & Home Theater" className="AddToCart" /></div>
              </Col>
              <Col sm={6} md={3}>
                <div className="CategoryAudio"><Link to="/category/Audio" className="AddToCart" /></div>
              </Col>
            </Row>
          </Grid>
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
