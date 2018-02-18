import React from 'react';
import Paper from 'material-ui/Paper';

import UserCreateContainer from '../containers/user.create.container';
import DeviceCreateContainer from '../containers/device.create.container';
import PermissionCreateContainer from '../containers/permission.create.container';

export default () => {
  const style = {
    margin: 20,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  };

  return (
    <div>
      <Paper style={style} zDepth={0}>
        <UserCreateContainer />
        <DeviceCreateContainer />
        <PermissionCreateContainer />
      </Paper>
    </div>
  );
};
