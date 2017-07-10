import React from "react"
import Modal from "modalTB"

class NewUser extends Modal {
  componentDidMount(){
    super.componentDidMount()
    if (this.props.state.users.selectedUser) { this.report({ url: "/user/generate", data: {tsz: this.props.state.users.selectedUser.tsz} }) }
  }
  create(tsz, username, email, password){
    this.report({ url: "/user/create", data: {tsz, username, email, password} })
  }
  reportChange(event, path) { this.dispatch({type: "INPUT_FIELD_CHANGED", value: event.target.value, path: path}) }
  content(props){
    let _ = this.props.dictionary.newUser
    let newUser = props.state.users.newUser
    let isClicked = props.state.pendingResponses.includes({ url: "/user/generate" })
    let notExisting = props.state.users.newUser.error
    return (
      <div className={"new-user-modal-content"}>
        {newUser.error ? <p>Nem léetző tsz</p> : null}
        <button className={"modal-close-button"}
          onClick={()=>this.close()}>x</button>
        <h4 className={"new-user-modal-title"}>
          {newUser.tsz == 0 ? _.titleFreelancer : _.titleWorker + "(" + newUser.name + ")"}</h4>
        <input className={"maxoft-input new-user-input"}
          placeholder={_.username} value={newUser.username}
          onChange={(event)=>this.reportChange(event, "users.newUser.username")}/><br/>
        <input className={"maxoft-input new-user-input"}
          placeholder={_.email} value={newUser.email}
          onChange={(event)=>this.reportChange(event, "users.newUser.email")}/><br/>
        <input className={"maxoft-input new-user-input"}
          placeholder={_.password} value={newUser.password}
          onChange={(event)=>this.reportChange(event, "users.newUser.password")}/><br/>
        <input className={"maxoft-input new-user-input"}
          placeholder={_.passwordAgain} value={newUser.passwordAgain}
          onChange={(event)=>this.reportChange(event, "users.newUser.passwordAgain")}/><br/>
        <button className={"maxoft-button new-user-report-button"}
          disabled={
            newUser.email.length < 1 ||
            newUser.username.length < 1 ||
            newUser.password.length < 1 ||
            newUser.password !=newUser.passwordAgain}
          onClick={()=>this.create(newUser.tsz, newUser.username, newUser.email, newUser.password)}>{_.create}</button>
      </div>
    )
  }
}

export default NewUser
