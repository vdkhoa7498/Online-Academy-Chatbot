import {
  setAuthLoading,
  setAuthMessage,
  setProfile,
  toggleGlobalLoading,
  clearProfile,
  setIsLoggedIn,
} from "./action";
import { httpClient } from "../../api";

export function login({ form, onSuccess, onFailure }) {
  return async (dispatch) => {
    try {
      dispatch(clearAuthMessage());
      dispatch(setAuthLoading(true));
      const result = await httpClient.auth.login(form);
      dispatch(setProfile(result.user));
      dispatch(setIsLoggedIn(true));
      localStorage.setItem("refresh_token", result.tokens.refresh.token);
      localStorage.setItem("access_token", result.tokens.access.token);
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("user", JSON.stringify(result.user));
      onSuccess(result.user);
      dispatch(setAuthLoading(false));
    } catch (error) {
      dispatch(setAuthLoading(false));
      dispatch(setAuthMessage(error.message || error));
      onFailure(error);
    }
  };
}

export function register({ form, onSuccess, onFailure }) {
  return async (dispatch) => {
    try {
      dispatch(setAuthLoading(true));
      const result = await httpClient.auth.register(form);
      onSuccess(result);
      dispatch(setAuthLoading(false));
    } catch (error) {
      dispatch(setAuthMessage(error.message || error));
      dispatch(setAuthLoading(false));
      onFailure(error);
    }
  };
}

export function loginWithGoogle({ tokenId, onSuccess, onFailure }) {
  return async (dispatch) => {
    try {
      dispatch(setAuthLoading(true));
      const result = await httpClient.auth.loginWithGoogle(tokenId);
      dispatch(setProfile(result.user));
      dispatch(setIsLoggedIn(true));
      localStorage.setItem("refresh_token", result.tokens.refresh.token);
      localStorage.setItem("access_token", result.tokens.access.token);
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("user", JSON.stringify(result.user));
      onSuccess(result.user);
      dispatch(setAuthLoading(false));
    } catch (error) {
      dispatch(setAuthLoading(false));
      dispatch(setAuthMessage(error.message || error));
      onFailure(error);
    }
  };
}

export function loginWithFacebook({ userInfoLogin, onSuccess, onFailure }) {
  return async (dispatch) => {
    try {
      dispatch(setAuthLoading(true));
      const result = await httpClient.auth.loginWithFacebook(userInfoLogin);
      dispatch(setProfile(result.user));
      dispatch(setIsLoggedIn(true));
      localStorage.setItem("refresh_token", result.tokens.refresh.token);
      localStorage.setItem("access_token", result.tokens.access.token);
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("user", JSON.stringify(result.user));
      onSuccess(result.user);
      dispatch(setAuthLoading(false));
    } catch (error) {
      dispatch(setAuthLoading(false));
      dispatch(setAuthMessage(error.message || error));
      onFailure(error);
      console.log("error in facebook login", error);
    }
  };
}

export function clearAuthMessage() {
  return (dispatch) => {
    dispatch(setAuthMessage(""));
  };
}

export function getProfile({ onSuccess, onFailure }) {
  return async (dispatch) => {
    // dispatch(toggleGlobalLoading(true));
    try {
      const result = await httpClient.auth.getProfile();
      dispatch(setProfile(result));
      dispatch(toggleGlobalLoading(false));
      dispatch(setIsLoggedIn(true));
      onSuccess(result);
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      onFailure(error);
      toggleGlobalLoading(false);
    }
  };
}

export function logout({ onSuccess, onFailure }) {
  return async (dispatch) => {
    try {
      dispatch(clearProfile());
      localStorage.removeItem("access_token");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      window.location.replace("/");
      onSuccess();
    } catch (error) {
      onFailure(error);
    }
  };
}

export function changePassword({ form, onSuccess, onFailure }) {
  return async (dispatch) => {
    try {
      const result = await httpClient.auth.changePassword(form);
      onSuccess();
    } catch (error) {
      dispatch(setAuthMessage(error.message || error));
      onFailure(error);
    }
  };
}

export function editProfile({ form, onSuccess, onFailure }) {
  return async (dispatch) => {
    try {
      dispatch(clearAuthMessage());
      const result = await httpClient.auth.editProfile(form);
      dispatch(setProfile(result));
      onSuccess(result);
    } catch (error) {
      dispatch(setAuthMessage(error.message || error));
      onFailure(error);
    }
  };
}
