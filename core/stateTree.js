const stateTree = {

  state: {
    app: 'login',
    appReady: false,
    modal: null,
    language: "hun",
    inTransition: false,
    pendingResponses: [],
    login: {
      username: "",
      password: "",
      error: false
    },
    reset: {
      username: "",
      error: false,
      success: false
    },
    users: {
      selectedUser: null,
      params: {
        tsz: "",
        name: "",
        username: "",
        birthDate: "",
        organization: "",
        email: ""
      },
      roleParams: [
        {role: "admin", apply: false, status: true},
        {role: "berjegyzek", apply: false, status: true},
        {role: "cafeteria", apply: false, status: true},
        {role: "wtfrole", apply: false, status: true},
        {role: "szabjovahagyo", apply: false, status: true},
        {role: "szabigenylo", apply: false, status: true},
        {role: "torzsadatkezelo", apply: false, status: true},
        {role: "ujbelepo", apply: false, status: true},
        {role: "onkiszolgalo", apply: false, status: true},
      ],
      newUser: {
        tsz: "",
        username: "",
        email: "",
        password: "",
        name: "",
        error: false
      }
    }
  },

  data: {
    client: {
      name: "",
      id: null
    },
    firm: {
      name: "",
      id: null
    },
    user: {},
    users: []
  },

  dictionary: {}

}

export default stateTree
