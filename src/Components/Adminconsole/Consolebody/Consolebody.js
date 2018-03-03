import React from 'react';
import { Grid, Row } from 'react-bootstrap';

import './Consolebody.css';
import Consoletab from './Consoletab/Consoletab';

class Consolebody extends React.Component {
  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Consoletab />
        </Row>
      </Grid>
    );
  }
}

export default Consolebody;
