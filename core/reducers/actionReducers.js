import set from 'lodash/set'
import {dictionary} from '../../language.config.js'

export const appReducer = (current, action) => {
  let nextState = Object.assign({}, current)
  nextState.state.app = action.app
  return nextState
}

export const languageReducer = (current, action) => {
  let nextState = Object.assign({}, current)
  nextState.state.language = action.language
  localStorage.maxoftLanguage = action.language
  nextState.dictionary = {}
  for (let app in dictionary) {
    nextState.dictionary[app] = {}
    for (let word in dictionary[app]) {
      nextState.dictionary[app][word] = dictionary[app][word][nextState.state.language]
    }
  }
  return nextState
}

export const modalOpenReducer = (current, action) => {
  let nextState = Object.assign({}, current)
  nextState.state.modal = action.modal
  nextState = modalSpec(nextState, action)
  return nextState
}

export const modalClosedReducer = (current, action) => {
  let nextState = Object.assign({}, current)
  nextState.state.modal = null
  return nextState
}

export const roleParamModifier = (current, action) => {
  let nextState = Object.assign({}, current)
  for (let param of nextState.state.users.roleParams){
    if (param.role == action.role) {
      param.status = action.isTrue
    }
  }
  return nextState
}

export const roleParamToggler = (current, action) => {
  let nextState = Object.assign({}, current)
  for (let param of nextState.state.users.roleParams){
    if (param.role == action.role) {
      param.apply = action.isTrue
    }
  }
  return nextState
}

export const clearRoleFilters = (current, action) => {
  let nextState = Object.assign({}, current)
  for (let param of nextState.state.users.roleParams){
    param.apply = false
    param.status = true
  }
  return nextState
}

export const inputReducer = (current, action) => {
  let nextState = Object.assign({}, current)
  set(nextState.state, action.path, action.value)
  nextState = inputSpec(nextState, action)
  return nextState
}

const inputSpec = (current, action) => {
  let nextState = Object.assign({}, current)
  switch (action.path){
    case "login.username":
      return loginInputHandler(current, action)
    case "login.password":
      return loginInputHandler(current, action)
    default:
      return nextState
  }
}

const modalSpec = (current, action) => {
  let nextState = Object.assign({}, current)
  switch (action.modal){
    case "resetPassword":
      return initializePasswordReseter(current, action)
    case "roleEditor":
      return initializeRoleEditor(current, action)
    case "newUser":
      return initializeNewUser(current, action)
    default:
      return nextState
  }
}

const loginInputHandler = (current, action) => {
  let nextState = Object.assign({}, current)
  nextState.state.login.error = false
  return nextState
}

const initializePasswordReseter = (current, action) => {
  let nextState = Object.assign({}, current)
  nextState.state.reset.username = ""
  nextState.state.reset.error = false
  nextState.state.reset.success = false
  return nextState
}

const initializeNewUser = (current, action) => {
  let nextState = Object.assign({}, current)
  nextState.state.users.selectedUser = null
  nextState.state.users.selectedUser = nextState.data.users.find( user => user.tsz == action.userTsz)
  if (nextState.state.users.selectedUser) {
    nextState.state.users.newUser.tsz = nextState.state.users.selectedUser.tsz
    nextState.state.users.newUser.email = nextState.state.users.selectedUser.email
    nextState.state.users.newUser.name = nextState.state.users.selectedUser.name
    nextState.state.users.newUser.username = nextState.state.users.selectedUser.username
    nextState.state.users.newUser.password = nextState.state.users.selectedUser.password
    nextState.state.users.newUser.passwordAgain = nextState.state.users.selectedUser.password
  } else {
    nextState.state.users.newUser.tsz = 0
    nextState.state.users.newUser.email = ""
    nextState.state.users.newUser.name = ""
    nextState.state.users.newUser.username = ""
    nextState.state.users.newUser.password = ""
    nextState.state.users.newUser.passwordAgain = ""
  }
  return nextState
}

const initializeRoleEditor = (current, action) => {
  let nextState = Object.assign({}, current)
  nextState.state.users.selectedUser = null
  nextState.state.users.selectedUser = nextState.data.users.find( user => user.tsz == action.userTsz)
  return nextState
}
