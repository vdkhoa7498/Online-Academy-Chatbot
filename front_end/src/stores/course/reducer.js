import { ActionTypeCourse } from './actionType';

export const initialState = {
  loading: false,
  highLightCourses: [],
}
export default function courseReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypeCourse.SetHighLightCourses:
      return {
        ...state,
        highLightCourses: action.payload
      }
    case ActionTypeCourse.Loading:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return {...state}
  }
}