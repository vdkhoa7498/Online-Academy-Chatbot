import { setAuthLoading, setAuthMessage, setProfile, toggleGlobalLoading, clearProfile, setIsLoggedIn } from './action';
import { qrHttpClient } from '../../api';

export function login({
  form,
  onSuccess,
  onFailure
}) {
  return async (dispatch) => {
    try {
      dispatch(clearAuthMessage());
      dispatch(setAuthLoading(true));
      const result = await qrHttpClient.auth.login(form);
      dispatch(setProfile(result.data.user));
      dispatch(setIsLoggedIn(true));
      localStorage.setItem('sanp-token', result.data.token.access_token);
      localStorage.setItem('isAuthenticated', JSON.stringify(true));
      
      onSuccess(result.data);
      dispatch(setAuthLoading(false));
    } catch (error) {
      dispatch(setAuthLoading(false));
      dispatch(setAuthMessage(error.message || error))
      onFailure(error);
    }
  }
}

export function signup({
  form,
  onSuccess,
  onFailure
}) {
  return async (dispatch) => {
    try {
      dispatch(setAuthLoading(true))
      const result = await qrHttpClient.auth.signup(form);
      onSuccess(result);
      dispatch(setAuthLoading(false));
    } catch (error) {
      dispatch(setAuthMessage(error.message || error))
      dispatch(setAuthLoading(false));
      onFailure(error);
    }
  }
}
export function clearAuthMessage() {
  return (dispatch) => {
    dispatch(setAuthMessage(''));
  }
}

export function getProfile({
  onSuccess,
  onFailure
}) {
  return async (dispatch) => {
    // dispatch(toggleGlobalLoading(true));
    try {
      const result = await qrHttpClient.auth.getProfile();
      dispatch(setProfile(result.data));
      dispatch(toggleGlobalLoading(false));
      dispatch(setIsLoggedIn(true));
      onSuccess(result.data);
    } catch (error) {
      localStorage.removeItem('sanp-token');
      localStorage.removeItem('isAuthenticated')
      onFailure(error);
      toggleGlobalLoading(false);
    }
  }
}

export function logout({
  onSuccess,
  onFailure
}) {
  return async (dispatch) => {
    try {
      dispatch(clearProfile());
      localStorage.removeItem('sanp-token');
      localStorage.removeItem('isAuthenticated')
      onSuccess()
    } catch (error) {
      onFailure(error);
    }
  }
}

export function changePassword({
  form,
  onSuccess,
  onFailure
}) {
  return async (dispatch) => {
    try {
      dispatch(clearAuthMessage());
      const result = await qrHttpClient.user.changePassword(form);
      if (result){
        onSuccess()
      }
    } catch (error) {
      dispatch(setAuthMessage(error.message || error))
      onFailure(error);
    }
  }
}

export function editProfile({
  form,
  onSuccess,
  onFailure
}) {
  return async (dispatch) => {
    // dispatch(toggleGlobalLoading(true));
    try {
      dispatch(clearAuthMessage());
      const result = await qrHttpClient.user.editProfile(form);
      dispatch(setProfile(result.data));
      onSuccess(result.data);
    } catch (error) {
      dispatch(setAuthMessage(error.message || error))
      onFailure(error);
    }
  }
}