import React from 'react'
import Modal from 'modalTB'

class ResetPassword extends Modal {
  reportChange(event, path) { this.dispatch({type: "INPUT_FIELD_CHANGED", value: event.target.value, path: path}) }
  requestReset(username) { this.report({ url: '/auth/reset', data: { username } }) }
  content(props){
    let _ = this.props.dictionary.resetPassword
    let username = this.props.state.reset.username
    let error = this.props.state.reset.error
    let success = this.props.state.reset.success
    let pending = this.props.state.pendingResponses.find( res => res.url == "/auth/reset")
    return (
      <div className={"reset-password-content"}>
        <button className={"modal-close-button"}
          onClick={()=>this.close()}>x</button>
        <h4 className={"reset-title"}>{_.title}</h4>
        <div className={"reset-input-container"}>
          <input className={"maxoft-input reset-input"}
            placeholder={_.username} value={username}
            onChange={(event)=>this.reportChange(event, "reset.username")}/>
        </div>
        <div className={"reset-text-container"}>
          <p>{error && _.fail}</p>
          <p>{success && _.success}</p>
          <p>{pending && _.wait}</p>
          <p>{(!pending && !error && !success) && _.info}</p>
        </div>
        <button className={"maxoft-button"} onClick={()=>this.requestReset()}>{_.reset}</button>
      </div>
    )
  }
}

export default ResetPassword
