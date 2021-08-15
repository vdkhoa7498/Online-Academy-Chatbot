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


export function setMyCourses(payload) {
  return {
    type: ActionTypeUser.SetMyCourses,
    payload
  }
}

export function getMyCourses(payload){
  return {
    type: ActionTypeUser.GetMyCourses,
    payload
  }
}