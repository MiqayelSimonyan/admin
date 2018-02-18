import {
  ADD_DEVICE,
  ADD_DEVICES,
  UPDATE_DEVICE,
  DELETE_DEVICE
} from '../actions/types';

export default function Devices(state = [], action) {
  let foundIndex;
  let newState;

  switch (action.type) {
    case ADD_DEVICE:
      return [...state, action.payload];
    case ADD_DEVICES:
      return [...action.payload];
    case UPDATE_DEVICE:
      foundIndex = state.findIndex(device => device._id === action.payload._id);
      newState = [...state];
      newState.splice(foundIndex, 1, action.payload);
      return [...newState];
    case DELETE_DEVICE:
      return [...state.filter(item => item._id !== action.payload._id)];
  }

  return state;
}
