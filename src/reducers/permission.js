import { ADD_PERMISSIONS, CREATE_PERMISSION, UPDATE_PERMISSION, DELETE_PERMISSION } from '../actions/types';
let foundIndex;
let newState;

export default function Permissions(state = [], action) {
  switch (action.type) {
    case ADD_PERMISSIONS:
      return [...action.payload.permissions];
    case CREATE_PERMISSION:
      return [...state, ...action.payload.permissions];
    case UPDATE_PERMISSION:
      foundIndex = state.findIndex(permission => permission._id === action.payload._id);
      newState = [...state];
      newState.splice(foundIndex, 1, action.payload);
      return [...newState];
    case DELETE_PERMISSION:
      return [...state.filter(item => item._id !== action.payload._id)];
  }

  return state;
}
