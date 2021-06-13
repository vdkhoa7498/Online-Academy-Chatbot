import { setCategoryLoading, setCategories } from './action';
import { httpClient } from '../../api';

export function getMenu() {
  return async (dispatch) => {
    try {
      const result = await httpClient.category.getCategories()
      dispatch(setCategories(result));
      dispatch(setCategoryLoading(true));
    } catch (error) {
      dispatch(setCategoryLoading(true));
    }
  }
}