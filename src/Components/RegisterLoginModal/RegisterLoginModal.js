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
      name: '',
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
    if (this.state.pwd.length === 0 ||
      this.state.email.length === 0) {
      this.setState({
        errOrSuccessStyle: 'danger',
        showAlertClass: '',
        alertText: 'Please fill the required fields',
      });
    } else if (this.state.pwd === '+++') {
      this.setState({
        errOrSuccessStyle: 'danger',
        showAlertClass: '',
        alertText: 'Please ensure your password is of 6 - 16 characters in length and contains a digit, a special character, an uppercase and a lowercase character',
      });
    } else {
      this.setState({
        errOrSuccessStyle: '',
        showAlertClass: 'ResponseNotif',
        alertText: '',
      });
      axios.post('/user/login', {
        password: this.state.pwd,
        email: this.state.email,
      }).then((resJSON) => {
        if (resJSON.data.statusCode === 200) {
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
                registerText: 'You are logged in!',
              });
              setTimeout(() =>
                this.setState({
                  show: false,
                }), 1000);
            }, 1000);
          }, 0);
        } else if (resJSON.data.statusCode === 401) {
          this.setState({
            errOrSuccessStyle: 'danger',
            showAlertClass: '',
            alertText: 'Invalid credentials!',
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

  checkForValidEmail =(emailValue) => {
    if (emailValue.length !== 0 && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailValue) === false) {
      this.setState({
        email: '',
        errOrSuccessStyle: 'danger',
        showAlertClass: '',
        alertText: 'Please enter a valid email address',
      });
    } else {
      this.setState({
        email: emailValue,
        errOrSuccessStyle: '',
        showAlertClass: 'ResponseNotif',
        alertText: '',
      });
    }
  }

  checkForValidPwd =(pwdValue) => {
    if (pwdValue.length !== 0 && /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(pwdValue) === false) {
      this.setState({
        pwd: '+++',
        errOrSuccessStyle: 'danger',
        showAlertClass: '',
        alertText: 'Please ensure your password is of 6 - 16 characters in length and contains a digit, a special character, an uppercase and a lowercase character',
      });
    } else {
      this.setState({
        pwd: pwdValue,
        errOrSuccessStyle: '',
        showAlertClass: 'ResponseNotif',
        alertText: '',
      });
    }
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
                  email: '',
                  pwd: '',
                  name: '',
                  activeLogin: 'activeTab',
                  activeRegister: '',
                  isLoading: false,
                });
              }, 1000);
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
          <Alert
            bsStyle={this.state.errOrSuccessStyle}
            className={this.state.showAlertClass}
          >
            {this.state.alertText}
          </Alert>
          <Form horizontal>
            <FormGroup controlId="formHorizontalLoginEmail">
              <Col sm={12}>
                <FormControl
                  type="email"
                  placeholder="Email"
                  bsSize="large"
                  onBlur={event => this.checkForValidEmail(event.target.value)}
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalLoginPassword">
              <Col sm={12}>
                <FormControl
                  type="password"
                  placeholder="Password"
                  bsSize="large"
                  onBlur={event => this.checkForValidPwd(event.target.value)}
                  value={this.state.pwd}
                  onChange={event => this.setState({ pwd: event.target.value })}
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
                value={this.state.name}
                onChange={event => this.setState({ name: event.target.value })}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalEmailRegister">
            <Col sm={12}>
              <FormControl
                type="email"
                placeholder="Enter your email"
                bsSize="large"
                onBlur={event => this.checkForValidEmail(event.target.value)}
                value={this.state.email}
                onChange={event => this.setState({ email: event.target.value })}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPasswordRegister">
            <Col sm={12}>
              <FormControl
                type="password"
                placeholder="Enter a new password"
                bsSize="large"
                onBlur={event => this.checkForValidPwd(event.target.value)}
                value={this.state.pwd}
                onChange={event => this.setState({ pwd: event.target.value })}
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
                value={this.state.rpwd}
                onChange={event => this.setState({ rpwd: event.target.value })}
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
              onClick={() => this.setState({
                loginOrRegister: 'login',
                activeLogin: 'activeTab',
                activeRegister: '',
                name: '',
                pwd: '',
                rpwd: '',
                email: '',
                isLoading: false,
                isLoggedIn: 'warning',
                signInText: 'Sign in to your account',
                isRegistered: 'warning',
                registerText: 'Sign up with a new email!',
                errOrSuccessStyle: '',
                showAlertClass: 'ResponseNotif',
              })
            }
            >
              Login
            </Button>
            <Button
              bsStyle="info"
              className={this.state.activeRegister}
              onClick={() => this.setState({
                loginOrRegister: 'register',
                activeRegister: 'activeTab',
                activeLogin: '',
                name: '',
                pwd: '',
                rpwd: '',
                email: '',
                isLoading: false,
                isLoggedIn: 'warning',
                signInText: 'Sign in to your account',
                isRegistered: 'warning',
                registerText: 'Sign up with a new email!',
                errOrSuccessStyle: '',
                showAlertClass: 'ResponseNotif',
              })
          }
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
