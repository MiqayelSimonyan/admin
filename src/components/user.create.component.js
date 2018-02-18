import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const UserCreateComponent = props => {
  const { user, devices, permissions, handleBlur, addNewDevice,
    handleChange, handleValidate, permissions_state,
    permissionHandleChange, submit, username, email, password } = props;

  const style = {
    margin: '12px 0'
  };

  const containersStyles = {
    margin: 5,
    width: '100%'
  };

  return (
    <div style={containersStyles}>
      <h2>create user</h2>
      <form onSubmit={submit} noValidate>
        <div className="form-group">
          <TextField
            type="text"
            hintText="username"
            id="username"
            name="username"
            floatingLabelText="username"
            onBlur={handleBlur.bind(null, 'username')}
            onChange={handleChange.bind(this, 'username')}
            errorText={handleValidate('username')}
          />
        </div>
        <div className="form-group">
          <TextField
            type="email"
            hintText="email"
            id="email"
            name="email"
            floatingLabelText="email"
            onBlur={handleBlur.bind(null, 'email')}
            onChange={handleChange.bind(null, 'email')}
            errorText={handleValidate('email')}
          />
        </div>
        <div className="form-group">
          <TextField
            type="password"
            hintText="password"
            id="password"
            name="password"
            floatingLabelText="password"
            onBlur={handleBlur.bind(null, 'password')}
            onChange={handleChange.bind(this, 'password')}
            errorText={handleValidate('password')}
          />
        </div>
        <AutoComplete
          hintText="Device name"
          floatingLabelText="Search Device"
          dataSource={devices.map(device => ({ text: device.name, value: device._id }))}
          filter={AutoComplete.fuzzyFilter}
          dataSourceConfig={{ text: 'text', value: 'value' }}
          onNewRequest={addNewDevice}
        />
        <div className="add_permission_wrapper">
          <SelectField
            multiple={true}
            floatingLabelText="Add Permissions"
            value={permissions_state.value}
            onChange={permissionHandleChange.bind(null, user, 'permissions_state')}
          >
            {permissions &&
              permissions.length &&
              permissions.map(permission => {
                return (
                  <MenuItem
                    key={permission._id}
                    value={permission._id}
                    primaryText={permission.name}
                  />
                );
              })}
          </SelectField>
        </div>
        <div className="form-group">
          <RaisedButton
            type="submit"
            label="create user"
            disabled={
              !username.value ||
              !username.valid ||
              (!email.value || !email.valid) ||
              (!password.value || !password.valid)
            }
            primary={true}
            style={style}
          />
        </div>
      </form>
    </div >
  );
};

UserCreateComponent.propTypes = {
  username: PropTypes.object.isRequired,
  email: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
};

export default UserCreateComponent;
