import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import Users from './user';
import Devices from './device';
import Permissions from './permission';
import Errors from './error';
import Success from './success';

export default combineReducers({
  Users,
  Devices,
  Permissions,
  Success,
  Errors,
  routing: routeReducer
});
