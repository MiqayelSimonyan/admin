import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserCreateComponent from '../components/user.create.component';
import AlertContainer from './alert/alert.container';
import { createUser } from '../middlewars/user.middleware';
import { getPermissions } from '../middlewars/permission.middleware';
import { getDevices } from '../middlewars/device.middleware';
import '../assets/styles/index.scss';

class UserCreateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: { value: '' },
      email: { value: '' },
      password: { value: '' },
      permissions_state: [{ value: '' }],
      device: [{ value: '' }]
    };
  }

  componentDidMount() {
    this.props.getDevices('/api/devices');
    this.props.getPermissions('/api/permissions');
  }

  static emailRegex() {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  handleChange = (field, event, index, value) => {
    if (!value) {
      this.setState({ [field]: { value: index } });
    } else {
      this.setState({ [field]: { value } });
    }
  }

  permissionHandleChange = (user, device, event, index, permissionIds) => {
    this.setState({ 'permissions_state': { value: permissionIds } });
    this.setState({ permissions: permissionIds })
  }

  addNewDevice = device => {
    this.setState({ newDevice: device.value });
  }

  submit = event => {
    event.preventDefault();
    let user = {
      username: this.state.username && this.state.username.value,
      email: this.state.email && this.state.email.value,
      password: this.state.password && this.state.password.value,
      devices: {
        permissions: this.state.permissions,
        device: this.state.newDevice
      }
    };
    this.props.AddUser('/api/user', user);
  }

  handleValidate = field => {
    switch (field) {
      case 'username':
        if (this.state.username.requiredValidate) {
          return 'username is required';
        } else if (this.state.username && this.state.username.value && (this.state.username.value.length < 3 || this.state.username.value.length > 20)) {
          return 'username should be between 3 and 20 characters';
        }
        return '';
      case 'email':
        if (this.state.email.requiredValidate) {
          return 'email is required';
        } else if (this.state.email.emailValidate) {
          return 'Invalid email address';
        }
        return '';
      case 'password':
        if (this.state.password.requiredValidate) {
          return 'password is required';
        }
        return '';
    }
  }

  handleBlur = field => {
    this.setState(state => {
      if (state[field].value) {
        if (field.toLowerCase() == 'email') {
          if (
            state[field].value.match(UserCreateContainer.emailRegex()) !== null
          ) {
            return {
              [field]: {
                value: state[field].value,
                emailValidate: false,
                valid: true
              }
            };
          } else {
            return {
              [field]: {
                value: state[field].value,
                emailValidate: true,
                valid: false
              }
            };
          }
        } else {
          return {
            [field]: {
              value: state[field].value,
              requiredValidate: false,
              valid: true
            }
          };
        }
      } else {
        return {
          [field]: { value: '', requiredValidate: true, valid: false }
        };
      }
    });
  }

  render() {
    return (
      <div className="user_component_wrapper">
        {this.props.errors && this.props.errors.length ? (
          <AlertContainer errors={this.props.errors} duration="8000" />
        ) : this.props.success && this.props.success.length ? (
          <AlertContainer errors={this.props.success} duration="8000" />
        ) : (
              ''
            )}
        <UserCreateComponent
          handleChange={this.handleChange}
          permissionHandleChange={this.permissionHandleChange}
          submit={this.submit}
          handleBlur={this.handleBlur}
          addNewDevice={this.addNewDevice}
          handleValidate={this.handleValidate}
          newDevice={this.state.newDevice}
          device={this.state.device}
          devices={this.props.devices}
          permissions={this.props.permissions}
          permissions_state={this.state.permissions_state}
          username={this.state.username}
          password={this.state.password}
          email={this.state.email}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    users: state.Users,
    permissions: state.Permissions,
    devices: state.Devices,
    errors: state.Errors,
    success: state.Success
  }),
  dispatch => ({
    AddUser: (url, user) => {
      dispatch(createUser(url, user));
    },
    getDevices: url => {
      dispatch(getDevices(url));
    },
    getPermissions: url => {
      dispatch(getPermissions(url));
    }
  })
)(UserCreateContainer);
