import React from 'react';
import {
  Modal,
  Button,
  ButtonGroup,
  FormGroup,
  FormControl,
  Form,
  Col,
  Panel,
  Alert,
}
  from 'react-bootstrap';
import './RegisterLoginModal.css';

const axios = require('axios');


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
      errOrSuccessStyle: '',
      showAlertClass: 'ResponseNotif',
      alertText: '',
      pwd: '',
      email: '',
      rpwd: '',
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

  handleRegister = () => {
    if (this.state.pwd.length === 0 ||
      this.state.name.length === 0 ||
      this.state.email.length === 0 ||
       this.state.rpwd.length === 0) {
      this.setState({
        errOrSuccessStyle: 'danger',
        showAlertClass: '',
        alertText: 'Please fill the required fields',
      });
    } else if (this.state.pwd !== this.state.rpwd) {
      this.setState({
        errOrSuccessStyle: 'danger',
        showAlertClass: '',
        alertText: 'Oh snap! Your passwords don\'t match.',
      });
    } else {
      this.setState({
        errOrSuccessStyle: '',
        showAlertClass: 'ResponseNotif',
        alertText: '',
      });
      axios.post('/user/register', {
        password: this.state.pwd,
        email: this.state.email,
        name: this.state.name,
      }).then((resJSON) => {
        if (resJSON.data.statusCode === 201) {
          setTimeout(() => {
            this.setState({
              isLoading: true,
              errOrSuccessStyle: '',
              showAlertClass: 'ResponseNotif',
              alertText: '',
            });
            setTimeout(() => {
              this.setState({
                showAlertClass: 'ResponseNotif',
                isRegistered: 'success',
                registerText: 'You are registered!',
              });
              setTimeout(() => {
                this.setState({
                  loginOrRegister: 'login',
                  activeLogin: 'activeTab',
                  activeRegister: '',
                  isLoading: false,
                });
              }, 500);
            }, 1000);
          }, 0);
        } else if (resJSON.data.statusCode === 409) {
          this.setState({
            errOrSuccessStyle: 'danger',
            showAlertClass: '',
            alertText: 'Email address is already registered!',
            isLoading: false,
          });
        } else if (resJSON.data.statusCode === 503) {
          this.setState({
            errOrSuccessStyle: 'danger',
            showAlertClass: '',
            alertText: 'Server error',
            isLoading: false,
          });
        }
      }).catch(err => console.log(err));
    }
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
                <FormControl
                  type="email"
                  placeholder="Email"
                  bsSize="large"
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col sm={12}>
                <FormControl
                  type="password"
                  placeholder="Password"
                  bsSize="large"
                />
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
        <Alert
          bsStyle={this.state.errOrSuccessStyle}
          className={this.state.showAlertClass}
        >
          {this.state.alertText}
        </Alert>
        <Form horizontal>
          <FormGroup controlId="formHorizontalNameRegister">
            <Col sm={12}>
              <FormControl
                type="text"
                placeholder="Enter your name"
                bsSize="large"
                onBlur={event => this.setState({ name: event.target.value })}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalEmailRegister">
            <Col sm={12}>
              <FormControl
                type="email"
                placeholder="Enter your email"
                bsSize="large"
                onBlur={event => this.setState({ email: event.target.value })}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPasswordRegister">
            <Col sm={12}>
              <FormControl
                type="password"
                placeholder="Enter a new password"
                bsSize="large"
                onBlur={(event) => {
                  if (/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(event.target.value)) {
                    console.log('Pass');
                    this.setState({
                      pwd: event.target.value,
                      errOrSuccessStyle: '',
                      showAlertClass: 'ResponseNotif',
                      alertText: '',
                     });
                  } else {
                    this.setState({
                      pwd: '',
                      errOrSuccessStyle: 'danger',
                      showAlertClass: '',
                      alertText: 'Please ensure your password is of 6 - 16 characters in length and contains a digit, a special character, an uppercase and a lowercase character',
                    });
                  }
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPasswordReenterRegister">
            <Col sm={12}>
              <FormControl
                type="password"
                placeholder="Re-enter your new password"
                bsSize="large"
                onBlur={event => this.setState({ rpwd: event.target.value })}
              />
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
      <Button
        bsStyle="primary"
        bsSize="large"
        onClick={this.handleShow}
      >
          Launch demo modal
      </Button>

      <Modal
        show={this.state.show}
        onHide={this.handleClose}
      >
        <Modal.Body>
          <ButtonGroup className="RegisterLoginButtons">
            <Button
              bsStyle="info"
              className={this.state.activeLogin}
              onClick={() => this.setState({ loginOrRegister: 'login', activeLogin: 'activeTab', activeRegister: '' })}
            >
              Login
            </Button>
            <Button
              bsStyle="info"
              className={this.state.activeRegister}
              onClick={() => this.setState({ loginOrRegister: 'register', activeRegister: 'activeTab', activeLogin: '' })}
            >
              Register
            </Button>
          </ButtonGroup>
          {this.showForm()}
        </Modal.Body>
      </Modal>
    </div>
  );
}
}

export default RegisterLoginModal;
