import {ActionTypeCourse} from './actionType';

export function setCourseLoading(payload) {
  return {
    type: ActionTypeCourse.Loading,
    payload
  }
}

export function setHighLightCoursesAction(payload) {
  return {
    type: ActionTypeCourse.SetHighLightCourses,
    payload
  }
}

export function setTopNewCoursesAction(payload) {
  return {
    type: ActionTypeCourse.SetTopNewCourses,
    payload
  }
}