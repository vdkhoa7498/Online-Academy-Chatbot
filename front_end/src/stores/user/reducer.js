import { ActionTypeUser } from './actionType';

export const initialState = {
  loading: false,
  watchList: [],
}
export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypeUser.SetWatchList:
      return {
        ...state,
        watchList: action.payload
      }
    case ActionTypeUser.Loading:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return {...state}
  }
}