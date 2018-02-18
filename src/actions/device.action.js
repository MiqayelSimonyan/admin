import {
    ADD_DEVICE,
    ADD_DEVICES,
    UPDATE_DEVICE,
    DELETE_DEVICE
} from './types';

export function AddDevice(payload) {
    return {
        type: ADD_DEVICE,
        payload
    };
}

export function AddDevices(payload) {
    return {
        type: ADD_DEVICES,
        payload
    };
}

export function UpdateDevice(payload) {
    return {
        type: UPDATE_DEVICE,
        payload
    };
}

export function DeleteDevice(payload) {
    return {
        type: DELETE_DEVICE,
        payload
    };
}