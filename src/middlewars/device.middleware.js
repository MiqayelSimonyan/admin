import shortid from 'shortid';

import {
  AddDevices,
  AddDevice,
  UpdateDevice,
  DeleteDevice,
} from '../actions/device.action';
import { Success, Failed } from '../actions/shared.action';

const config = (method, data) => {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method,
    credentials: 'include',
    body: JSON.stringify(data)
  };
};

export function getDevices(url) {
  return dispatch => {
    fetch(url, { method: 'GET' })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.status && data.status !== 200)
          throw new Error(
            data.message && data.message.message
              ? data.message.message
              : data.message
          );
        dispatch(AddDevices(data.devices));
      });
  };
}

export function createDevice(url, device) {
  return dispatch => {
    fetch(url, config('POST', device))
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.status && data.status !== 200)
          throw new Error(
            data.message && data.message.message
              ? data.message.message
              : data.message
          );
        dispatch(AddDevice(data));
        dispatch(Success({ id: shortid.generate(), message: data.message }));
      })
      .catch(err => {
        dispatch(Failed({ id: shortid.generate(), message: err }));
      });
  };
}

export function updateDevice(url, user) {
  return dispatch => {
    fetch(url, config('PUT', user))
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.status && data.status !== 200)
          throw new Error(
            data.message && data.message.message
              ? data.message.message
              : data.message
          );
        dispatch(UpdateDevice(data));
        dispatch(Success({ id: shortid.generate(), message: data.message }));
      })
      .catch(err => {
        dispatch(Failed({ id: shortid.generate(), message: err }));
      });
  };
}

export function deleteDevice(url, id) {
  return dispatch => {
    fetch(url, config('DELETE', id))
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.status && data.status !== 200)
          throw new Error(
            data.message && data.message.message
              ? data.message.message
              : data.message
          );
        dispatch(DeleteDevice(data));
        dispatch(Success({ id: shortid.generate(), message: data.message }));
      })
      .catch(err => {
        dispatch(Failed({ id: shortid.generate(), message: err }));
      });
  };
}