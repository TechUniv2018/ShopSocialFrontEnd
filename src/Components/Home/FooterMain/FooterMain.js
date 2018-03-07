import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPhone, faLocationArrow, faEnvelope, faCheck, faHeart } from '@fortawesome/fontawesome-free-solid';


class FooterMain extends React.Component {
  render() {
    return (
      <div>
        <Grid >
          <Row className="show-grid">
            <Col xs={12} md={4}>
              <div>
                <h2 style={{ 'text-align': 'center' }}> Contact Us </h2>
                <div>
                  <h4> <FontAwesomeIcon icon={faPhone} /> 9878976765 </h4>
                  <h4> <FontAwesomeIcon icon={faEnvelope} /> help@shopsocial.com</h4>
                  <h4> <FontAwesomeIcon icon={faLocationArrow} /> 7th Floor, Nalapad Brigade Center, Bengaluru, Karnataka, India </h4>
                </div>
              </div>
            </Col>
            <Col xs={12} md={5} mdOffset={3}>
              <div>
                <h2 style={{ 'text-align': 'center' }}> Terms and Conditions </h2>
                <div style={{ 'text-align': 'justify' }}>
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
