import {dictionary} from '../../language.config.js'

export const requestReducer = (current, action) => {
  console.log("request sent to", action.request.url)
  let nextState = Object.assign({}, current)
  nextState.state.pendingResponses.push(action.request)
  return nextState
}

export const responseReducer = (current, response) => {
  console.log("response from", response.from.url)
  console.log("data sent:", response.content)
  let nextState = Object.assign({}, current)
  nextState.state.pendingResponses = nextState.state.pendingResponses.filter((req) => req != response.from)
  switch (response.from.url){
    case "/auth/init":
      return initializer(current, response)
    case "/auth/logout":
      return handleLogoutResponse(nextState, response)
    case "/auth/login":
      return handleLoginResponse(nextState, response)
    case "/info/client":
      return handleClientResponse(nextState, response)
    case "/info/firm":
      return handleFirmResponse(nextState, response)
    case "/user/getall":
      return handleUsers(nextState, response)
    case "/user/generate":
      return handleGenerated(nextState, response)
    case "/user/create":
      return handleCreated(nextState, response)
    case "/user/updateRole":
      return handleUpdate(nextState, response)
    default:
      return nextState
  }
}

const initializer = (current, response) => {
  let nextState = Object.assign({}, current)
  nextState.state.language = localStorage.maxoftLanguage ?
    localStorage.maxoftLanguage :
    navigator.language == "hu" ? "hu" : "eng"
  localStorage.maxoftLanguage = nextState.state.language
  nextState.dictionary = {}
  for (let app in dictionary) {
    nextState.dictionary[app] = {}
    for (let word in dictionary[app]) {
      nextState.dictionary[app][word] = dictionary[app][word][nextState.state.language]
    }
  }
  nextState.state.app = response.content.error ? "login" : "home"
  if (!response.content.error) {
    nextState.data.user.username = response.content.username
  }
  nextState.state.appReady = true
  return nextState
}

const handleLogoutResponse = (current, response) => {
  let nextState = Object.assign({}, current)
  nextState.state.app = response.content.isSuccessful ? "login" : "home"
  return nextState
}

const handleLoginResponse = (current, response) => {
  let nextState = Object.assign({}, current)
  nextState.state.app = response.content.isSuccessful ? "home" : "login"
  nextState.state.login.error = !response.content.isSuccessful
  if (response.content.isSuccessful) {
    nextState.data.user.username = nextState.state.login.username
    nextState.state.login.username = ""
    nextState.state.login.password = ""
  }
  return nextState
}

const handleClientResponse = (current, response) => {
  let nextState = Object.assign({}, current)
  nextState.data.client.name = response.content.client[2]
  nextState.data.client.id= response.content.client[0]
  return nextState
}

const handleFirmResponse = (current, response) => {
  let nextState = Object.assign({}, current)
  nextState.data.firm.name = response.content.firm[2]
  nextState.data.firm.id= response.content.firm[0]
  return nextState
}

const handleGenerated = (current, response) => {
  let nextState = Object.assign({}, current)
  nextState.state.users.newUser.username = response.content.generated[0]
  nextState.state.users.newUser.password = response.content.generated[1]
  return nextState
}

const handleCreated = (current, response) => {
  let nextState = Object.assign({}, current)
  nextState.state.users.newUser.error = response.content.adminCreated == "" ? false : true
  return nextState
}

const handleUsers = (current, response) => {
  let nextState = Object.assign({}, current)
  nextState.data.users = response.content.users.map(createUser)
  return nextState
}

const handleUpdate = (current, response) => {
  let nextState = Object.assign({}, current)
  let role = response.from.data.role
  let setTo = response.from.data.setTo
  if (!response.content.error) {
    nextState.state.users.selectedUser.roles[role] = setTo
  }
  return nextState
}

const createUser = (user) => {
  let standardized =  {
    id: user[0], firmId: user[1], tsz: user[2],
    title: user[3], familyName: user[4], givenName: user[5], name: user[4] + " " + user[5],
    password: user[6], birthDate: user[8], birthPlace: user[9], email: user[10],
    organization: user[11], memberSince: user[12], wtf1: user[13], username: user[14], password: user[15], wtf2: user[16],
    roles: {
      admin: user[17], berjegyzek: user[18], cafeteria: user[20],
      wtfrole: user[19], szabjovahagyo: user[21], szabigenylo: user[22],
      torzsadatkezelo: user[23], ujbelepo: user[24], onkiszolgalo: user[25]
    }
  }
  for (let role in standardized.roles) {
    standardized.roles[role] = standardized.roles[role] == "True" ? true : false
  }
  return standardized
}
