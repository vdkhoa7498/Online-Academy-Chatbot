import {ActionTypeCategory} from './actionType';

export function setCategoryLoading(payload) {
  return {
    type: ActionTypeCategory.Loading,
    payload
  }
}

export function setCategories(payload) {
  return {
    type: ActionTypeCategory.SetCategories,
    payload
  }
}