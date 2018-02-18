import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getPermissions,
  updatePermission,
  deletePermission
} from '../middlewars/permission.middleware';
import AlertContainer from './alert/alert.container';
import PermissionListComponent from '../components/permission.list.component';
import PermissionCreateComponent from '../components/permission.create.component';
import { createPermission } from '../middlewars/permission.middleware';

class PermissionListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getPermissions('/api/permissions');
  }

  updatePermission = permission => {
    if (this.state.permission)
      this.props.updatePermission(`/api/permission/${permission._id}`, this.state.permission);
  }

  deletePermission = id => {
    let permissionDeleteSuccess = confirm('Do you want to delete permission');
    if (permissionDeleteSuccess) this.props.deletePermission(`/api/permission/${id}`);
  }

  handleChange = (permission, event) => {
    this.setState({ permission: { id: permission._id, name: event.target.value } });
  }

  addPermissionHandler = chips => {
    this.setState({ permissions: chips.map(chip => ({ name: chip })), permissionsArray: chips });
  }

  addPermission = () => {
    if (this.state && this.state.permissions)
      this.props.AddPermission('/api/permission', { permissions: this.state.permissions, permissionsArray: this.state.permissionsArray });
  }

  render() {
    return this.props.permissions ? (
      <div>
        {this.props.errors && this.props.errors.length ? (
          <AlertContainer errors={this.props.errors} duration="8000" />
        ) : this.props.success && this.props.success.length ? (
          <AlertContainer errors={this.props.success} duration="8000" />
        ) : (
              ''
            )}
        <PermissionListComponent
          handleChange={this.handleChange}
          permissions={this.props.permissions}
          updatePermission={this.updatePermission}
          deletePermission={this.deletePermission}
          addPermissionHandler={this.addPermissionHandler}
          addPermission={this.addPermission}
        />
        <PermissionCreateComponent
          handleChange={this.addPermissionHandler}
          permissions_state={this.state.permissions}
          createPermission={this.addPermission}
        />
      </div>
    ) : (
        ''
      );
  }
}

export default connect(
  state => ({
    permissions: state.Permissions,
    errors: state.Errors,
    success: state.Success
  }),
  dispatch => ({
    getPermissions: url => {
      dispatch(getPermissions(url));
    },
    AddPermission: (url, user) => {
      dispatch(createPermission(url, user));
    },
    updatePermission: (url, permission) => {
      dispatch(updatePermission(url, permission));
    },
    deletePermission: url => {
      dispatch(deletePermission(url));
    }
  })
)(PermissionListContainer);
