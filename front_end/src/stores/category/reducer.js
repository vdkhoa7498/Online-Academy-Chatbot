import { ActionTypeCategory } from './actionType';

export const initialState = {
  loading: false,
  categories: [],
}
export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypeCategory.SetCategories:
      return {
        ...state,
        categories: action.payload
      }
    case ActionTypeCategory.Loading:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return {...state}
  }
}