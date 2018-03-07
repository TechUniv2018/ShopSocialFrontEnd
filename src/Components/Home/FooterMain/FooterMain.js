import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPhone, faGlobe, faEnvelope, faCheck, faHeart } from '@fortawesome/fontawesome-free-solid';


class FooterMain extends React.Component {
  render() {
    return (
      <div>
        <div className="HomeFooter">
          <div className="HomeFooterContact">
            <h1 style={{ 'text-align': 'left', 'margin-left': '20%', 'margin-right': '20%' }}> Contact Us </h1> <br />
            <div style={{ 'text-align': 'left', 'margin-left': '20%', 'margin-right': '20%' }}>
              <h4> <FontAwesomeIcon icon={faPhone} /> 9878976765 </h4>
              <h4> <FontAwesomeIcon icon={faEnvelope} /> help@shopsocial.com</h4>
              <h4>  <FontAwesomeIcon icon={faGlobe} />  7th Floor Nalapad Brigade Center, Bangalore, India </h4>
            </div>
          </div>
          <div className="HomeFooterInfo">
            <h1 style={{ 'text-align': 'left', 'margin-left': '20%', 'margin-right': '20%' }}> Terms and Conditions </h1> <br />
            <div style={{ 'text-align': 'left', 'margin-left': '20%', 'margin-right': '20%' }}>
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

        </div>
        <center><h6 style={{ color: 'grey' }}> Made with  <FontAwesomeIcon icon={faHeart} /> by Interns @MDL2018BNG and Raman</h6> </center>

      </div>
    );
  }
}
FooterMain.defaultProps = {
};
FooterMain.propTypes = {
};
export default FooterMain;
