import shortid from 'shortid';

import {
  AddUsers,
  AddUser,
  UpdateUser,
  DeleteUser,
  DeleteUserPermission,
  DeleteUserDevice,
} from '../actions/user.action';
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

export function getUsers(url) {
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
        dispatch(AddUsers(data.users));
      });
  };
}

export function createUser(url, user) {
  return dispatch => {
    fetch(url, config('POST', user))
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
        dispatch(AddUser(data));
        dispatch(Success({ id: shortid.generate(), message: data.message }));
      })
      .catch(err => {
        dispatch(Failed({ id: shortid.generate(), message: err }));
      });
  };
}

export function updateUser(url, user) {
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
        dispatch(UpdateUser(data));
        dispatch(Success({ id: shortid.generate(), message: data.message }));
      })
      .catch(err => {
        dispatch(Failed({ id: shortid.generate(), message: err }));
      });
  };
}

export function deleteUser(url, id) {
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
        dispatch(DeleteUser(data));
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
        dispatch(DeleteUserPermission(data));
        dispatch(Success({ id: shortid.generate(), message: data.message }));
      })
      .catch(err => {
        dispatch(Failed({ id: shortid.generate(), message: err }));
      });
  };
}

export function deleteUserDevice(url, id) {
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
        dispatch(DeleteUserDevice(data));
        dispatch(Success({ id: shortid.generate(), message: data.message }));
      })
      .catch(err => {
        dispatch(Failed({ id: shortid.generate(), message: err }));
      });
  };
}