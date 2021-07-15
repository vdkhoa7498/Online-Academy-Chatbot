import { setWatchListLoading, setWatchList } from './action';
import { httpClient } from '../../api';

export function getWatchList() {
  return async (dispatch) => {
    try {
      const result = await httpClient.user.getWatchList();
      console.log("result", result);
      dispatch(setWatchList(result));
      dispatch(setWatchListLoading(true));
    } catch (error) {
      dispatch(setWatchListLoading(true));
    }
  }
}
