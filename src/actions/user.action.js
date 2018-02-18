import {
    ADD_USER,
    ADD_USERS,
    UPDATE_USER,
    DELETE_USER,
    DELETE_USER_PERMISSION,
    DELETE_USER_DEVICE
} from './types';

export function AddUser(payload) {
    return {
        type: ADD_USER,
        payload
    };
}

export function AddUsers(payload) {
    return {
        type: ADD_USERS,
        payload
    };
}

export function UpdateUser(payload) {
    return {
        type: UPDATE_USER,
        payload
    };
}

export function DeleteUser(payload) {
    return {
        type: DELETE_USER,
        payload
    };
}

export function DeleteUserPermission(payload) {
    return {
        type: DELETE_USER_PERMISSION,
        payload
    }
}

export function DeleteUserDevice(payload) {
    return {
        type: DELETE_USER_DEVICE,
        payload
    }
}