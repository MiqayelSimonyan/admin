import {
  ADD_USERS, ADD_USER, UPDATE_USER, DELETE_USER,
  DELETE_USER_PERMISSION, DELETE_USER_DEVICE
} from '../actions/types';

export default function Users(state = [], action) {
  let foundIndex;
  let newState;

  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];
    case ADD_USERS:
      return [...action.payload];
    case UPDATE_USER:
      foundIndex = state.findIndex(user => user._id === action.payload._id);
      newState = [...state];
      newState.splice(foundIndex, 1, action.payload);
      return [...newState];
    case DELETE_USER:
      return [...state.filter(item => item._id !== action.payload._id)];
    case DELETE_USER_PERMISSION:
      foundIndex = state.findIndex(user => user._id === action.payload._id);
      newState = [...state];
      newState[foundIndex]['devices'] = newState[foundIndex]['devices'].map(item => {
        if (item.permissions && item.permissions.length) {
          return { device: item.device, permissions: item.permissions.filter(permission => permission._id !== action.payload.permissionId) }
        } else {
          return { device: item.device, permissions: [] };
        }
      });
      return [...newState];
    case DELETE_USER_DEVICE:
      foundIndex = state.findIndex(user => user._id === action.payload._id);
      newState = [...state];
      if (action.payload.devices.length) {
        newState[foundIndex]['devices'] = newState[foundIndex]['devices'].filter(item => item.device._id !== action.payload.deviceId);
      } else {
        newState[foundIndex]['devices'] = [];
      }
      return [...newState];
  }

  return state;
}
