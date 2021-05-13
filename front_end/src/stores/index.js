import { createStore, applyMiddleware } from "redux";
import rootReducers from './reducers';
import { createBrowserHistory } from "history";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

export default function configureStore() {
  const getThunkMidleware = () => {
    if (process.env.NODE_ENV === 'development') {
      return [routerMiddleware(history), thunk];
    }

    return [routerMiddleware(history), thunk]
  }
  const store = createStore(
    rootReducers(history),
    composeWithDevTools(
      applyMiddleware(
        ...getThunkMidleware()
      )
    )
  )

  return store;
}