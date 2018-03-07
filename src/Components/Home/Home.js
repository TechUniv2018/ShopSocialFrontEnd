import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
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
          <Grid>
            <Row className="show-grid">
              <Col sm={6} md={3}>
                <div className="CategoryTv">A</div>
              </Col>
              <Col sm={6} md={3}>
                <div className="CategoryDvd">A</div>
              </Col>
              <Col sm={6} md={3}>
                <div className="CategoryFurn">A</div>
              </Col>
              <Col sm={6} md={3}>
                <div className="CategoryAudio">A</div>
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
