import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getDevices,
  updateDevice,
  deleteDevice
} from '../middlewars/device.middleware';
import AlertContainer from './alert/alert.container';
import DeviceListComponent from '../components/device.list.component';
import DeviceCreateComponent from '../components/device.create.component';

import { createDevice } from '../middlewars/device.middleware';

class DeviceListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getDevices('/api/devices');
  }

  updateDevice = (device) => {
    if (this.state.device)
      this.props.updateDevice(`/api/device/${device._id}`, this.state.device);
  }

  deleteDevice = id => {
    let deviceDeleteSuccess = confirm('Do you want to delete device');
    if (deviceDeleteSuccess) this.props.deleteDevice(`/api/device/${id}`);
  }

  handleChange = (device, event) => {
    this.setState({ device: { id: device._id, name: event.target.value } });
  }

  addDeviceHandler = event => {
    this.setState({ newDevice: { name: event.target.value } });
  }

  addDevice = event => {
    event.preventDefault();
    if (this.state && this.state.newDevice)
      this.props.AddDevice('/api/device', { name: this.state.newDevice.name });
  }

  render() {
    return this.props.devices ? (
      <div>
        {this.props.errors && this.props.errors.length ? (
          <AlertContainer errors={this.props.errors} duration="8000" />
        ) : this.props.success && this.props.success.length ? (
          <AlertContainer errors={this.props.success} duration="8000" />
        ) : (
              ''
            )}
        <DeviceListComponent
          handleChange={this.handleChange}
          devices={this.props.devices}
          updateDevice={this.updateDevice}
          deleteDevice={this.deleteDevice}
          addDeviceHandler={this.addDeviceHandler}
          addDevice={this.addDevice}
        />
        <DeviceCreateComponent
          deviceHandleChange={this.addDeviceHandler}
          device={this.state.newDevice}
          submit={this.addDevice}
        />
      </div>
    ) : (
        ''
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
    getDevices: url => {
      dispatch(getDevices(url));
    },
    AddDevice: (url, user) => {
      dispatch(createDevice(url, user));
    },
    updateDevice: (url, device) => {
      dispatch(updateDevice(url, device));
    },
    deleteDevice: url => {
      dispatch(deleteDevice(url));
    }
  })
)(DeviceListContainer);
