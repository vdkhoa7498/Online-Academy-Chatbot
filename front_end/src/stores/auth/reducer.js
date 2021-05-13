import { ActionTypeAuth } from './actionType';

export const initialState = {
  // isRequesting: false,
  // data: null,
  isLoggedIn: false,
  user: null,
  loading: false,
  message: '',
  visibleModal: false,
  globalLoading: true
}
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypeAuth.SetGlobalLoading:
      return {
        ...state,
        globalLoading: action.payload
      }
    case ActionTypeAuth.Loading:
      return {
        ...state,
        loading: action.payload
      }
    case ActionTypeAuth.SetErrorMessage:
      return {
        ...state,
        message: action.payload
      }
    case ActionTypeAuth.ToggleVisibleModal:
      return {
        ...state,
        visibleModal: action.payload
      }
    case ActionTypeAuth.SetProfile:
      return {
        ...state,
        user: action.payload
      }
    case ActionTypeAuth.ClearProfile:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        loading: false,
        message: '',
        visibleModal: false,
        globalLoading: false
      }
    case ActionTypeAuth.SetIsLoggedIn:
      return {
        ...state,
        isLoggedIn: action.payload
      }
    default:
      return {...state}
  }
}