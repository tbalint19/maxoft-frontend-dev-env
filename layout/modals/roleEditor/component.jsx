import React from 'react'
import Modal from 'modalTB'

class RoleEditor extends Modal {
  updateRole(username, role, setTo) { this.report({ url: "/user/updateRole", data: { username, role, setTo } }) }
  content(props){
    let _ = props.dictionary.roleEditor
    let selectedUser = props.state.users.selectedUser
    let attributes = ["tsz", "name", "username", "birthdate", "email", "organization"]
    let roles = ["admin", "berjegyzek", "cafeteria", "wtfrole", "szabjovahagyo", "szabigenylo", "torzsadatkezelo", "ujbelepo", "onkiszolgalo"]
    let pendingResponses = props.state.pendingResponses
    return (
      <div className={"role-editor-content"}>
        <button className={"modal-close-button"}
          onClick={()=>this.close()}>x</button>
        <h4 className={"edit-role-title"}>{_.title}</h4>
        <div className={"role-edit-all-about"}>
          <div className={"role-edit-user-info"}>
            {attributes.map((attribute) => (
              <p>{selectedUser[attribute]}</p>
            ))}
          </div>
          <div className={"role-edit-user-roles"}>
            {roles.map((role) => {
              let isClicked = pendingResponses.find((res)=>res.url == "/user/updateRole" && res.data.tsz == selectedUser.tsz && res.data.role == role)
              return (
                <button
                  key={role}
                  disabled={isClicked}
                  className={selectedUser.roles[role] == true ? " maxoft-button active-role-button" : "maxoft-button inactive-role-button"}
                  onClick={()=>this.updateRole(selectedUser.username, role, !selectedUser.roles.role)}>
                  {isClicked ? <LoadingRoleUpdate/> : _[role]}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default RoleEditor

const LoadingRoleUpdate = (props) => (
  <i class="material-icons md-12">data_usage</i>
)
