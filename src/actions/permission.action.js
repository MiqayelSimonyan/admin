import {
    ADD_PERMISSIONS,
    CREATE_PERMISSION,
    UPDATE_PERMISSIONS,
    DELETE_PERMISSION
} from './types';

export function GetPermissions(payload) {
    return {
        type: ADD_PERMISSIONS,
        payload
    };
}

export function CreatePermission(payload) {
    return {
        type: CREATE_PERMISSION,
        payload
    }
}

export function UpdatePermission(payload) {
    return {
        type: UPDATE_PERMISSIONS,
        payload
    };
}

export function DeletePermission(payload) {
    return {
        type: DELETE_PERMISSION,
        payload
    }
}
