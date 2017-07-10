import {createStore} from 'redux'
import createApiController from 'httpclient'
import stateTree from './stateTree'

import {
  languageReducer,
  appReducer,
  modalOpenReducer,
  modalClosedReducer,
  inputReducer,
  roleParamModifier,
  roleParamToggler,
  clearRoleFilters
} from './reducers/actionReducers'

import {
  requestReducer,
  responseReducer
} from './reducers/asyncReducers'

const core = (() => {

  const initialState = Object.assign({}, stateTree)

  const reducer = (current = initialState, action) => {
    let nextState
    console.log("\nAction happened: " + action.type);
    switch (action.type) {
      case "APP_REQUESTED":
        nextState = appReducer(current, action)
        return nextState
      case "LANGUAGE_CHANGED":
        nextState = languageReducer(current, action)
        return nextState
      case "MODAL_OPENED":
        nextState = modalOpenReducer(current, action)
        return nextState
      case "MODAL_CLOSED":
        nextState = modalClosedReducer(current, action)
        return nextState
      case "INPUT_FIELD_CHANGED":
        nextState = inputReducer(current, action)
        return nextState
      case "REQUEST_MADE":
        nextState = requestReducer(current, action)
        return nextState
      case "RESPONSE_ARRIVED":
        nextState = responseReducer(current, action)
        return nextState
      case "ROLE_MODIFIED":
        nextState = roleParamModifier(current, action)
        return nextState
      case "ROLE_TOGGLED":
        nextState = roleParamToggler(current, action)
        return nextState
      case "ROLE_FILTERS_CLEARED":
        nextState = clearRoleFilters(current, action)
        return nextState
      default:
        nextState = Object.assign({}, current)
        return nextState
    }
  }

  const controller = createStore(reducer)
  createApiController(controller)

  return {controller}

})()

export default core
