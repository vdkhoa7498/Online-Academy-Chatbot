import { setWatchListLoading, setWatchList } from './action';
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

export function removeFavoriteCourse(id){
  return async (dispatch) => {
    try {
      const result = await httpClient.user.removeFavoriteCourse(id);
      dispatch(setWatchList(result));
      dispatch(setWatchListLoading(true));
    } catch (error) {
      dispatch(setWatchListLoading(true));
    }
  }
}
