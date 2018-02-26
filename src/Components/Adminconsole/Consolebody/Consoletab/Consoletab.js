import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Inventory from './Inventory/Inventory';

// import OrderAdmin from './OrderAdmin/OrderAdmin';


class ControlledTabs extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: 1,
    };
  }

  handleSelect(key) {
    this.setState({ key });
  }

  render() {
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
      >
        <Tab eventKey={1} title="Inventory">
          <Inventory />
        </Tab>
        <Tab eventKey={2} title="Orders">
          {/* <OrderAdmin /> */}
        </Tab>
      </Tabs>
    );
  }
}


class Consoletab extends React.Component {
  render() {
    return (
      <ControlledTabs />
    );
  }
}

export default Consoletab;
