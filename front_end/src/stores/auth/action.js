import {ActionTypeAuth} from './actionType';

export function setAuthLoading(payload) {
  return {
    type: ActionTypeAuth.Loading,
    payload
  }
}
export function setAuthMessage(payload) {
  return {
    type: ActionTypeAuth.SetErrorMessage,
    payload
  }
}
export function toggleAuthModal(payload) {
  return (dispatch) => dispatch({
    type: ActionTypeAuth.ToggleVisibleModal,
    payload
  })
}
export function toggleGlobalLoading(payload) {
  return dispatch => dispatch({
  // return {
    type: ActionTypeAuth.SetGlobalLoading,
    payload
  // }
  })
}
export function setProfile(payload) {
  return {
    type:ActionTypeAuth.SetProfile,
    payload
  }
}

export function setIsLoggedIn(payload) {
  return {
    type:ActionTypeAuth.SetIsLoggedIn,
    payload
  }
}

export function clearProfile() {
  return {
    type:ActionTypeAuth.ClearProfile
  }
}