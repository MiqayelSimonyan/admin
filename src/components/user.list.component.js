import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { blue500, red500 } from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import ContentEditable from 'react-contenteditable';
import DeviceToggleComponent from './device.toggle.component';
import DeviceComponent from './device.component';
import '../assets/styles/index.scss';

const UserListComponent = props => {
  const style = {
    margin: '0 12px'
  };

  const iconStyles = {
    width: 19,
    position: 'relative',
    top: '8px',
    cursor: 'pointer'
  };

  const EditIcon = (props) => (
    <SvgIcon {...props}>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </SvgIcon>
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Username</TableHeaderColumn>
          <TableHeaderColumn>Email</TableHeaderColumn>
          <TableHeaderColumn>devices</TableHeaderColumn>
          <TableHeaderColumn />
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {props.users ? props.users.map(user => {
          return (
            <TableRow key={user._id}>
              <TableRowColumn>
                <EditIcon
                  className="edit_icon"
                  style={iconStyles}
                  color={blue500}
                />
                <ContentEditable
                  html={user.username}
                  className="edit_area"
                  onChange={props.handleChange.bind(
                    null,
                    user,
                    'username',
                  )}
                />
              </TableRowColumn>
              <TableRowColumn>
                <EditIcon
                  className="edit_icon"
                  style={iconStyles}
                  color={blue500}
                />
                <ContentEditable
                  html={user.email}
                  className="edit_area"
                  onChange={props.handleChange.bind(
                    null,
                    user,
                    'email',
                  )}
                />
              </TableRowColumn>
              <TableRowColumn>
                {user.devices && user.devices.length
                  ?
                  user.devices.map(item =>
                    <DeviceComponent
                      key={item.device._id}
                      user={user}
                      item={item}
                      style={iconStyles}
                      color={red500}
                      deletePermissionHandler={props.deletePermissionHandler}
                      {...props}
                    />
                  )
                  :
                  ''
                }
                <DeviceToggleComponent
                  user={user}
                  addDeviceToggle={props.addDeviceToggle}
                  isOpen={props.isOpen}
                  devices={props.devices}
                  addNewDevice={props.addNewDevice}
                  permissions={props.permissions}
                  permissions_state={props.permissions_state}
                  permissionHandleChange={props.permissionHandleChange}
                  newDevice={props.newDevice}
                  updateUser={props.updateUser}
                  style={iconStyles}
                  color={blue500}
                />
              </TableRowColumn>
              <TableRowColumn style={{ textAlign: 'right' }}>
                <RaisedButton
                  label="Delete"
                  secondary={true}
                  style={style}
                  onClick={props.deleteUser.bind(null, user._id)}
                />
                <RaisedButton
                  label="Update"
                  primary={true}
                  style={style}
                  onClick={props.updateUser.bind(null, user)}
                />
              </TableRowColumn>
            </TableRow>
          );
        }) : ''}
      </TableBody>
    </Table>
  );
};

export default UserListComponent;
