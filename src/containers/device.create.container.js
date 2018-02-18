import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeviceCreateComponent from '../components/device.create.component';
import { createDevice } from '../middlewars/device.middleware';

class DeviceCreateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device: '',
    };
  }

  deviceHandleChange = (event, value) => {
    this.setState({ device: value });
  }

  handleValidate = field => {
    switch (field) {
      case 'deviceName':
        if (this.state.deviceName.requiredValidate) {
          return 'deviceName is required';
        }
        return '';
    }
  }

  submit = event => {
    event.preventDefault();
    this.props.AddDevice('/api/device', { name: this.state.device });
  }

  render() {
    return (
      <div style={{ width: '32%' }}>
        <h2>create device</h2>
        <DeviceCreateComponent
          handleValidate={this.handleValidate}
          deviceHandleChange={this.deviceHandleChange}
          submit={this.submit}
          device={this.state.device}
          devices={this.props.devices}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    devices: state.Devices,
    errors: state.Errors,
    success: state.Success
  }),
  dispatch => ({
    AddDevice: (url, user) => {
      dispatch(createDevice(url, user));
    }
  })
)(DeviceCreateContainer);
