import shortid from 'shortid';

import {
  GetPermissions,
  CreatePermission,
  UpdatePermission,
  DeletePermission,
} from '../actions/permission.action';
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

export function getPermissions(url) {
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
        dispatch(GetPermissions(data));
      })
      .catch(err => {
        dispatch(Failed({ id: shortid.generate(), message: err }));
      });
  };
}

export function createPermission(url, permission) {
  return dispatch => {
    fetch(url, config('POST', permission))
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
        dispatch(CreatePermission(data));
        dispatch(Success({ id: shortid.generate(), message: data.message }));
      })
      .catch(err => {
        dispatch(Failed({ id: shortid.generate(), message: err }));
      });
  };
}

export function updatePermission(url, permission) {
  return dispatch => {
    fetch(url, config('PUT', permission))
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
        dispatch(UpdatePermission(data));
        dispatch(Success({ id: shortid.generate(), message: data.message }));
      })
      .catch(err => {
        dispatch(Failed({ id: shortid.generate(), message: err }));
      });
  };
}

export function deletePermission(url, id) {
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
        dispatch(DeletePermission(data));
        dispatch(Success({ id: shortid.generate(), message: data.message }));
      })
      .catch(err => {
        dispatch(Failed({ id: shortid.generate(), message: err }));
      });
  };
}