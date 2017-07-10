import React from 'react'
import Container from 'container'

class NavBar extends Container {
  requestLogout(username) { this.report({url: "/auth/logout", data: { username }}) }
  getHome() { this.dispatch({type: "APP_REQUESTED", app: "home"}) }
  render(){
    let _ = this.props.dictionary.navbar
    let app = this.props.state.app
    let user = this.props.data.user
    let firm = this.props.data.firm
    let client = this.props.data.client
    return (
      <div className={"navbar"}>
        <div className={"navbar-controller"}>
          <div className={"navbar-text"}>Wizuál Bér {_.portal}{app != "login" ? (" " + client.name + " - " + firm.name) : ""}</div>
          <div className={"navbar-welcome"}>{app == "home" ? (_.welcome + user.username) + "!" : ""}</div>
          <div className={"navbar-buttons"}>
            <button className={"navbar-button"}>
              <i className="material-icons md-12 icon-align">help_outline</i>{_.help}
            </button>
            {(app != "login" && app != "home") && <button className={"navbar-button"} onClick={()=>this.getHome()}>
              <i className="material-icons md-12 icon-align">account_balance</i>{_.home}
            </button>}
            {app == "home" && <button className={"navbar-button"} onClick={()=>this.requestLogout(user)}>
              <i className="material-icons md-12 icon-align">power_settings_new</i>{_.logout}
            </button>}
          </div>
        </div>
        <div className={"navbar-placeholder"}></div>
      </div>
    )
  }
}

export default NavBar
