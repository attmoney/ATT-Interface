import { Types } from './types'
import { toast, Zoom } from 'react-toastify'

const toastifyAlign = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Zoom,
}

export const Error = {
  errorHandle,
  closeErr,
  toastifyMsg,
}

function errorHandle(error) {
  return (dispatch) => {
    dispatch(setError(error))
  }
}

function closeErr() {
  return (dispatch) => {
    dispatch(closeModal())
  }
}
function toastifyMsg(type, msg) {
  if (type === 'info') {
    toast.info(msg, toastifyAlign)
  } else if (type === 'success') {
    toast.success(msg, toastifyAlign)
  } else if (type === 'warn') {
    toast.warning(msg, toastifyAlign)
  } else if (type === 'err') {
    toast.error(msg, toastifyAlign)
  } else {
    toast(msg, toastifyAlign)
  }
}

function setError(error) {
  return { type: Types.ERROR_MESSAGE, error, errorEnable: true }
}
function closeModal() {
  return { type: Types.ERROR_MESSAGE, error: '', errorEnable: false }
}
