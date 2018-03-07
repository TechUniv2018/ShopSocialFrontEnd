import React from 'react';
import { Modal, Button, ButtonGroup, FormGroup, FormControl, Form, Col, Panel } from 'react-bootstrap';
import './RegisterLoginModal.css';


class RegisterLoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      loginOrRegister: 'login',
      isLoading: false,
      isLoggedIn: 'warning',
      signInText: 'Sign in to your account',
      activeLogin: 'activeTab',
      activeRegister: '',
      isRegistered: 'warning',
      registerText: 'Sign up with a new email!',
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleLogin = () => {
    this.setState({ isLoading: true });

    // This probably where you would have an `ajax` call
    setTimeout(() => {
      // Completed of async action, set loading state back
      this.setState({
        isLoading: false, isLoggedIn: 'success', signInText: 'Signed in successfully!', show: false,
      });
    }, 2000);
  }

showForm = () => {
  if (this.state.loginOrRegister === 'login') {
    return (
      <Panel bsStyle={this.state.isLoggedIn}>
        <Panel.Heading>
          <Panel.Title componentClass="h3">{this.state.signInText}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col sm={12}>
                <FormControl type="email" placeholder="Email" bsSize="large" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col sm={12}>
                <FormControl type="password" placeholder="Password" bsSize="large" />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={5} >
                <Button
                  bsStyle="primary"
                  disabled={this.state.isLoading}
                  bsSize="large"
                  onClick={!this.state.isLoading ? this.handleLogin : null}
                >
                  {this.state.isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Panel.Body>
      </Panel>);
  }
  return (
    <Panel bsStyle={this.state.isRegistered}>
      <Panel.Heading>
        <Panel.Title componentClass="h3">{this.state.registerText}</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <Form horizontal>
          <FormGroup controlId="formHorizontalNameRegister">
            <Col sm={12}>
              <FormControl type="text" placeholder="Enter your name" bsSize="large" />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalEmailRegister">
            <Col sm={12}>
              <FormControl type="email" placeholder="Enter your email" bsSize="large" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPasswordRegister">
            <Col sm={12}>
              <FormControl type="password" placeholder="Enter a new password" bsSize="large" />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPasswordReenterRegister">
            <Col sm={12}>
              <FormControl type="password" placeholder="Enter a new password" bsSize="large" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={5} >
              <Button
                bsStyle="warning"
                disabled={this.state.isLoading}
                bsSize="large"
                onClick={!this.state.isLoading ? this.handleRegister : null}
              >
                {this.state.isLoading ? 'Please wait' : 'Register'}
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel.Body>
    </Panel>);
}

render() {
  return (
    <div className="RegisterLoginModal">
      <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          Launch demo modal
      </Button>

      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Body>
          <ButtonGroup className="RegisterLoginButtons">
            <Button bsStyle="info" className={this.state.activeLogin}onClick={() => this.setState({ loginOrRegister: 'login', activeLogin: 'activeTab', activeRegister: '' })}>Login</Button>
            <Button bsStyle="info" className={this.state.activeRegister}onClick={() => this.setState({ loginOrRegister: 'register', activeRegister: 'activeTab', activeLogin: '' })}>Register</Button>
          </ButtonGroup>
          {this.showForm()}
        </Modal.Body>
      </Modal>
    </div>
  );
}
}

export default RegisterLoginModal;
