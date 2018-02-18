import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import { blue500 } from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';
import ContentEditable from 'react-contenteditable';

const PermissionListComponent = props => {
  const { permissions, handleChange, deletePermission, updatePermission } = props;

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
    <div>
      <Table style={{ marginBottom: '50px' }}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>PermissionName</TableHeaderColumn>
            <TableHeaderColumn />
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {permissions.map(permission => {
            return (
              <TableRow key={permission._id}>
                <TableRowColumn>
                  <EditIcon
                    className="edit_icon"
                    style={iconStyles}
                    color={blue500}
                  />
                  <ContentEditable
                    className="device_edit_area edit_area"
                    html={permission.name}
                    onChange={handleChange.bind(null, permission)}
                  />
                </TableRowColumn>
                <TableRowColumn style={{ textAlign: 'right' }}>
                  <RaisedButton
                    label="Delete"
                    secondary={true}
                    style={style}
                    onClick={deletePermission.bind(null, permission._id)}
                  />
                  <RaisedButton
                    label="Update"
                    primary={true}
                    style={style}
                    onClick={updatePermission.bind(null, permission)}
                  />
                </TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PermissionListComponent;
