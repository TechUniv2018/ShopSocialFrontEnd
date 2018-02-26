import React from 'react';
import './Consolebody.css';
import Consoletab from './Consoletab/Consoletab';
import { Grid, Row, Col } from 'react-bootstrap';

class Consolebody extends React.Component {
  constructor(props) {
    super(props);
  }

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
