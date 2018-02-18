import {
    SET_SUCCESS,
    SET_ERROR,
    DELETE_SUCCESS,
    DELETE_ERROR,
    DELETE_ERRORS
} from './types';

export function Success(success) {
    return {
        type: SET_SUCCESS,
        success
    };
}

export function Failed(error) {
    return {
        type: SET_ERROR,
        error
    };
}

export function DeleteSuccess(id) {
    return {
        type: DELETE_SUCCESS,
        id
    };
}

export function DeleteError(id) {
    return {
        type: DELETE_ERROR,
        id
    };
}

export function DeleteErrors() {
    return {
        type: DELETE_ERRORS
    };
}