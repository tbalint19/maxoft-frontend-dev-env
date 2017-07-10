import React from 'react'
import Container from 'container'

class Login extends Container {
  requestForgotten() { this.dispatch({type: "MODAL_OPENED", modal: "resetPassword"}) }
  reportChange(event, path) { this.dispatch({type: "INPUT_FIELD_CHANGED", value: event.target.value, path: path}) }
  requestLogin(username, password) { this.report({ url: '/auth/login', data: { username, password} }) }
  render(){
    let _ = this.props.dictionary.login
    let username = this.props.state.login.username
    let password = this.props.state.login.password
    let error = this.props.state.login.error
    let pending = this.props.state.pendingResponses.find( res => res.url == "/auth/login")
    return (
      <div className={"login"}>
        <LoginLogo/>
        <InfoPlaceholder error={error} errorText={_.invalidCredentials} waitText={_.wait} pending={pending}/>
        <LoginInput type={"text"} value={username} placeholder={_.username} action={(event)=>this.reportChange(event, "login.username")}/>
        <LoginInput type={"password"} value={password} placeholder={_.password} action={(event)=>this.reportChange(event, "login.password")}/>
        <div className={"forgotten"}>
          <button className={"link-button"} onClick={()=>this.requestForgotten()}>{_.forgottenPassword}</button>
        </div>
        <div className={"login-button"}>
          <button className={"maxoft-button"} onClick={()=>this.requestLogin(username, password)}>
            <i className="material-icons md-12 icon-align">vpn_key</i>{_.login}
          </button>
        </div>
      </div>
    )
  }

}

export default Login

const LoginLogo = (props) => (
  <div className={"login-logo"}>
    <h2>(MaXoft Logo)</h2>
  </div>
)

const LoginInput = (props) => (
  <div className={"login-input"}>
    <input className={"maxoft-input login-input"} placeholder={props.placeholder} onChange={props.action} value={props.value} type={props.type}/>
  </div>
)

const InfoPlaceholder = (props) => (
  <div className={"login-error"}>
    {props.error && <p className={"login-error-text"}>{props.errorText}</p>}
    {props.pending && <p className={"login-wait-text"}>{props.waitText}</p>}
  </div>
)
