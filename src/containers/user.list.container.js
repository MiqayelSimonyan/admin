import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getUsers,
  updateUser,
  deleteUser,
  deletePermission,
  deleteUserDevice
} from '../middlewars/user.middleware';
import { getDevices } from '../middlewars/device.middleware';
import { getPermissions } from '../middlewars/permission.middleware';
import AlertContainer from './alert/alert.container';
import UserListComponent from '../components/user.list.component';

class UserListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      permissions_state: [{ id: {value: ''} }],
    };
  }

  componentDidMount() {
    this.props.getUsers('/api/users');
    this.props.getDevices('/api/devices');
    this.props.getPermissions('/api/permissions');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users != this.props.users) {
      this.setState({ usersCopy: nextProps.users });
      nextProps.users.forEach(user => this.setState({ [user._id]: { isOpen: false } }));
    }
  }

  handleChange = (user, field, event, index, value) => {
    const { usersCopy } = this.state;
    var _value = event.target.value || value;
    let foundUser = usersCopy.find(userCopy => userCopy._id == user._id);

    switch (field) {
      case 'username':
        return foundUser.username = _value;
      case 'email':
        return foundUser.email = _value;
      case 'permissions_state':
        this.setState({ [field]: { _value } });
        return foundUser.newPermissions = _value;
      case 'device':
        return foundUser.newDevice = { name: _value }
    }
  }

  permissionHandleChange = (user, device, event, index, permissionIds) => {
    this.setState({ 'permissions_state': { [user._id]: {value: permissionIds} } });
    const { usersCopy } = this.state;
    let foundUser = usersCopy.find(userCopy => userCopy._id == user._id);
    if (permissionIds) foundUser.newPermissions = permissionIds;
  }

  addNewDevice = device => {
    this.setState({ newDevice: device.value });
  }

  fieldValueRemove = (field) => {
    let add_fields = document.querySelectorAll(field);
    for (let i = 0; i < add_fields.length; i++) {
      add_fields[i].innerHTML = '';
    }
  }

  updateUser = user => {
    const { usersCopy } = this.state;

    this.fieldValueRemove('.add_field');
    let userUpdate = { ...usersCopy.find(userCopy => userCopy._id === user._id) };
    userUpdate.devices = userUpdate.devices.map(item => {
      return {
        device: item.device._id,
        permissions: item.permissions.length ? item.permissions.map(permission => permission._id) : []
      }
    });

    if (userUpdate.devices && this.state.newDevice) {
      if (userUpdate.newPermissions) {
        userUpdate.devices = [...userUpdate.devices, { device: this.state.newDevice, permissions: userUpdate.newPermissions }];
      } else {
        userUpdate.devices = [...userUpdate.devices, { device: this.state.newDevice }];
      }
    } else if (!userUpdate.devices && this.state.newDevice) {
      if (userUpdate.newPermissions) {
        userUpdate.devices = [{ device: this.state.newDevice, permissions: userUpdate.newPermissions }];
      } else {
        userUpdate.devices = [{ device: this.state.newDevice }];
      }
    }
    this.props.updateUser(`/api/user/${user._id}`, userUpdate);
  }

  deleteUser = id => {
    let userDelete = confirm('Do you want to delete user');
    if (userDelete) this.props.deleteUser(`/api/user/${id}`);
  }

  deleteDeviceHandler = (user, device) => {
    let deviceDelete = confirm('Do you want to delete user device');
    if (deviceDelete) this.props.deleteUserDevice(`/api/user/${user._id}/device/${device._id}`);
  }

  deletePermissionHandler = (user, permission) => {
    let permissionDelete = confirm('Do you want to delete user permission');
    if (permissionDelete) this.props.deletePermission(`/api/user/${user._id}/permission/${permission._id}`);
  }

  addDeviceToggle = userId => {    
    this.setState(state => ({
      [userId]: {
        isOpen: state[userId] ? !state[userId].isOpen : false
      }
    }));
  }

  render() {
    return this.props.users ? (
      <div>
        {this.props.errors && this.props.errors.length ? (
          <AlertContainer errors={this.props.errors} duration="8000" />
        ) : this.props.success && this.props.success.length ? (
          <AlertContainer errors={this.props.success} duration="8000" />
        ) : (
              ''
            )}
        <UserListComponent
          newDevice={this.state.newDevice}
          isOpen={this.state}
          fruit={this.state.fruit}
          addDeviceToggle={this.addDeviceToggle}
          handleChange={this.handleChange}
          permissionHandleChange={this.permissionHandleChange}
          devices={this.props.devices}
          permissions={this.props.permissions}
          permissions_state={this.state.permissions_state}
          users={this.props.users}
          updateUser={this.updateUser}
          deleteUser={this.deleteUser}
          deleteDeviceHandler={this.deleteDeviceHandler}
          addNewDevice={this.addNewDevice}
          deletePermissionHandler={this.deletePermissionHandler}
        />
      </div>
    ) : (
        ''
      );
  }
}

export default connect(
  state => ({
    users: state.Users,
    devices: state.Devices,
    permissions: state.Permissions,
    errors: state.Errors,
    success: state.Success
  }),
  dispatch => ({
    getUsers: url => {
      dispatch(getUsers(url));
    },
    getDevices: url => {
      dispatch(getDevices(url));
    },
    updateUser: (url, user) => {
      dispatch(updateUser(url, user));
    },
    deleteUser: url => {
      dispatch(deleteUser(url));
    },
    deletePermission: url => {
      dispatch(deletePermission(url));
    },
    deleteUserDevice: url => {
      dispatch(deleteUserDevice(url));
    },
    getPermissions: url => {
      dispatch(getPermissions(url));
    }
  })
)(UserListContainer);