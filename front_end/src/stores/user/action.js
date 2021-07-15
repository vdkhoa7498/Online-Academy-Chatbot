import {ActionTypeUser} from './actionType';

export function setWatchListLoading(payload) {
  return {
    type: ActionTypeUser.Loading,
    payload
  }
}

export function setWatchList(payload) {
  return {
    type: ActionTypeUser.SetWatchList,
    payload
  }
}