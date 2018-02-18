import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import '../assets/styles/index.scss';

const DeviceCreateComponent = props => {
  const { submit, deviceHandleChange, device } = props;

  const style = {
    margin: '12px 0'
  };

  const containersStyles = {
    margin: 5,
    width: '32%'
  };

  return (
    <div style={containersStyles}>
      <form onSubmit={submit}>
        <div className="form-group">
          <div className="form-group">
            <TextField
              type="text"
              hintText="Device name"
              id="device_name"
              name="Device name"
              floatingLabelText="Device name"
              onChange={deviceHandleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <RaisedButton
            type="submit"
            disabled={!device}
            label="create device"
            primary={true}
            style={style}
          />
        </div>
      </form>
    </div>
  );
};

export default DeviceCreateComponent;
