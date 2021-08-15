import { setWatchListLoading, setWatchList, setMyCourses, GetMyCourses } from './action';
import { httpClient } from '../../api';

export function getWatchList() {
  return async (dispatch) => {
    try {
      const result = await httpClient.user.getWatchList();
      dispatch(setWatchList(result));
      dispatch(setWatchListLoading(true));
    } catch (error) {
      dispatch(setWatchListLoading(true));
    }
  }
}

export function getMyCourses() {
  return async (dispatch) => {
    try {
      const result = await httpClient.user.getMyCourses();
      dispatch(setMyCourses(result));
    } catch (error) {
      dispatch(setWatchListLoading(true));
    }
  }
}


export function removeFavoriteCourse(id){
  return async (dispatch) => {
    try {
      const result = await httpClient.user.removeFavoriteCourse(id);
      dispatch(setWatchList(result));
    } catch (error) {
      dispatch(setWatchListLoading(true));
    }
  }
}

export function removeRegisterCourse(id){
  return async (dispatch) => {
    try {
      const result = await httpClient.user.removeRegisterCourse(id);
      dispatch(setMyCourses(result));
    } catch (error) {
      dispatch(setWatchListLoading(true));
    }
  }
}
