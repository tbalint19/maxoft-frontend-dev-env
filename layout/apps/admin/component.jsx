import React from 'react'
import Container from 'container'

class Admin extends Container {
  componentDidMount() { this.getUsers() }
  getUsers() { this.fetch({ url: "/user/getall" }) }
  reportChange(event, path) { this.dispatch({type: "INPUT_FIELD_CHANGED", value: event.target.value, path: path}) }
  addNewUser(tsz) { this.dispatch({type: "MODAL_OPENED", modal: "newUser", userTsz: tsz}) }
  EditUserRole(tsz) { this.dispatch({type: "MODAL_OPENED", modal: "roleEditor", userTsz: tsz}) }
  filterRoles() { this.dispatch({type: "MODAL_OPENED", modal: "roleFilter"}) }
  clearRoleFilters() { this.dispatch({ type: "ROLE_FILTERS_CLEARED" }) }
  render() {
    let _ = this.props.dictionary.admin
    let params = this.props.state.users.params
    let roleParams = this.props.state.users.roleParams
    let users = this.props.data.users
    return (
      <div className={"users"}>
        <div className={"users-header"}>
          <div className={"users-header-first-row"}>
            <UsersLogo title={_.title}/>
            <div className={"users-header-buttons"}>
              <FilterButton name={_.filter} action={()=>this.filterRoles()} clear={()=>this.clearRoleFilters()}/>
              <NewUserButton name={_.newUser} action={()=>this.addNewUser("0")}/>
            </div>
          </div>
          <div className={"users-header-second-row"}>
            <p className={"filter-info"}>Only "admin"</p>
          </div>
          <div className={"search-bars"}>
            <SearchField placeholder={_.tsz} width={50} action={(e)=>this.reportChange(e, "users.params.tsz")} value={params.tsz}/>
            <SearchField placeholder={_.name} width={150} action={(e)=>this.reportChange(e, "users.params.name")} value={params.name}/>
            <SearchField placeholder={_.username} width={175} action={(e)=>this.reportChange(e, "users.params.username")} value={params.username}/>
            <SearchField placeholder={_.birthDate} width={75} action={(e)=>this.reportChange(e, "users.params.birthDate")} value={params.birthDate}/>
            <SearchField placeholder={_.organization} width={75} action={(e)=>this.reportChange(e, "users.params.organization")} value={params.organization}/>
            <SearchField placeholder={"email"} width={175} action={(e)=>this.reportChange(e, "users.params.email")} value={params.email}/>
          </div>
        </div>
        <div className={"user-list"}>
          {users
             .filter((user) => user.tsz.includes(params.tsz))
             .filter((user) => user.username.includes(params.username))
             .filter((user) => user.name.includes(params.name))
             .filter((user) => user.birthDate.includes(params.birthDate))
             .filter((user) => user.organization.includes(params.organization))
             .filter((user) => user.email.includes(params.email))
             .filter((user) => roleParams[0].apply ? user.roles.admin == roleParams[0].status : true)
             .filter((user) => roleParams[1].apply ? user.roles.berjegyzek == roleParams[1].status : true)
             .filter((user) => roleParams[2].apply ? user.roles.cafeteria == roleParams[2].status : true)
             .filter((user) => roleParams[3].apply ? user.roles.wtfrole == roleParams[3].status : true)
             .filter((user) => roleParams[4].apply ? user.roles.szabjovahagyo == roleParams[4].status : true)
             .filter((user) => roleParams[5].apply ? user.roles.szabigenylo == roleParams[5].status : true)
             .filter((user) => roleParams[6].apply ? user.roles.torzsadatkezelo == roleParams[6].status : true)
             .filter((user) => roleParams[7].apply ? user.roles.ujbelepo == roleParams[7].status : true)
             .filter((user) => roleParams[8].apply ? user.roles.onkiszolgalo == roleParams[8].status : true)
             .map((user)=>(
                 <User _={_}
                   user={user} key={user.tsz}
                   edit={()=>this.EditUserRole(user.tsz)}
                   create={()=>this.addNewUser(user.tsz)}/>))}
        </div>
      </div>
    )
  }
}

export default Admin

const UsersLogo = (props) => (
  <div className={"users-logo"}>
    <h3>(MaXoft Logo)&nbsp;-&nbsp;<span className={"users-title"}>{props.title}</span></h3>
  </div>
)

const FilterButton = (props) => (
  <div>
    <button className={"maxoft-button filter-button"} onClick={props.action}>
      <i className="material-icons icon-align md-12">reorder</i>
      {props.name}
    </button>
    <button className={"maxoft-button filter-delete-button"} onClick={props.clear}>
      <i className="material-icons icon-align md-12">backspace</i>
    </button>
  </div>
)

const NewUserButton = (props) => (
  <div className={"new-user"}>
    <button className={"maxoft-button"} onClick={props.action}>
      <i className="material-icons icon-align md-12">person_add</i>
      {props.name}
    </button>
  </div>
)

const SearchField = (props) => (
  <div className={"search-field"}>
    <input
      onChange={props.action}
      disabled={props.disabled}
      placeholder={props.placeholder}
      className={"search-bar-input"}
      style={{width: props.width}}/>
  </div>
)

const User = (props) => (
  <div className={"user-row"} onClick={props.action}>
    <div style={{width: "50px"}}>{props.user.tsz}</div>
    <div style={{width: "150px"}} className={"align-left-col"}>{props.user.name}</div>
    <div style={{width: "175px"}} className={"align-left-col"}>
      {props.user.username ? props.user.username : <button onClick={props.create} className={"users-create-button"}>{props._.create}</button>}
    </div>
    <div style={{width: "75px"}}>{props.user.birthDate}</div>
    <div style={{width: "75px"}}>{props.user.organization}</div>
    <div style={{width: "175px"}} className={"align-left-col"}>{props.user.email}</div>
    <div style={{width: "100px"}}>
      {props.user.username ?
        <button className={"users-edit-button"} onClick={props.edit}>{props._.editRoles}</button> :
        <button className={"users-edit-placeholder-button"} disabled={true}>{props._.editRoles}</button>}
    </div>
  </div>
)
