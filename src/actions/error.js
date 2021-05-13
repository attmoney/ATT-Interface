import { Types } from './types';
import { toast } from 'react-toastify';

const toastifyAlign = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

export const Error = {
    errorHandle,
    closeErr,
    toastifyMsg
}

function errorHandle(error) {
    return dispatch => {
        dispatch(setError(error));
    }
}

function closeErr() {
    return dispatch => {
        dispatch(closeModal());
    }
}
function toastifyMsg(type, msg) {
    if (type === 'info') {
        toast.success(msg, toastifyAlign);
    }
    else if (type === 'err') {
        toast.info(msg, toastifyAlign);
    } else if (type === 'tx') {
        toast.dark(msg, toastifyAlign);
    }
}

function setError(error) { return { type: Types.ERROR_MESSAGE, error, errorEnable: true } }
function closeModal() { return { type: Types.ERROR_MESSAGE, error: '', errorEnable: false } }