import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import authReducer from "./auth/reducer";
import categoryReducer from "./category/reducer"

const reducers =  (history) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  category: categoryReducer,
})

export default reducers