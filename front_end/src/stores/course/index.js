import { setCourseLoading, setHighLightCoursesAction } from './action';
import { httpClient } from '../../api';

export function setHighLightCourses() {
  return async (dispatch) => {
    try {
      const result = await httpClient.course.getHighLightCourses()
      dispatch(setHighLightCoursesAction(result.results));
      dispatch(setCourseLoading(true));
    } catch (error) {
      dispatch(setCourseLoading(true));
    }
  }
}