import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import authReducer from "./auth/reducer";
import categoryReducer from "./category/reducer"
import userReducer from './user/reducer';

const reducers =  (history) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  category: categoryReducer,
  user: userReducer,
})

export default reducers