import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import authReducer from "./auth/reducer";

const reducers =  (history) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
})

export default reducers