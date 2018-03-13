import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPhone, faLocationArrow, faEnvelope, faCheck, faHeart } from '@fortawesome/fontawesome-free-solid';

import './FooterMain.css';

class FooterMain extends React.Component {
  render() {
    return (
      <div className="Footer">
        <Grid className="FooterContent">
          <Row className="show-grid">
            <Col xs={12} md={4}>
              <div>
                <h3 className="FooterCenterText"> Contact Us </h3>
                <br />
                <div>
                  <h5> <FontAwesomeIcon icon={faPhone} /> 9878976765 </h5>
                  <h5> <FontAwesomeIcon icon={faEnvelope} /> help@shopsocial.com</h5>
                  <h5> <FontAwesomeIcon icon={faLocationArrow} /> 7th Floor, Nalapad Brigade Center, Bengaluru, Karnataka, India </h5>
                </div>
              </div>
            </Col>
            <Col xs={12} md={5} mdOffset={3}>
              <div>
                <h3 className="FooterCenterText"> Terms and Conditions </h3>
                <br />
                <div className="FooterJustifyText">
                  <h6> <FontAwesomeIcon icon={faCheck} /> Use of the Website is available only to persons who can form legally
                    binding contracts under Indian Contract Act, 1872.
                  </h6>
                  <h6> <FontAwesomeIcon icon={faCheck} /> As a minor if you wish to use or transact on website, such use or transaction may
                    be made by your legal guardian or parents on the Website.
                  </h6>
                  <h6> <FontAwesomeIcon icon={faCheck} /> If You use the Website, You shall be responsible for maintaining the confidentiality of your Display Name and Password and You shall be responsible for all activities that occur
                     under your Display Name and Password.
                  </h6>
                </div>
              </div>

            </Col>
          </Row>
        </Grid>
        <center><h6 style={{ color: 'grey' }}> Made with  <FontAwesomeIcon icon={faHeart} /> by Mac-n-Code</h6> </center>
      </div>
    );
  }
}
FooterMain.defaultProps = {
};
FooterMain.propTypes = {
};
export default FooterMain;
