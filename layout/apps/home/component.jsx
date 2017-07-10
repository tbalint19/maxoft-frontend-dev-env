import React from 'react'
import Container from 'container'

class Home extends Container {
  getUsers() { this.dispatch({ type: "APP_REQUESTED", app: "admin" }) }
  componentDidMount(){
    this.fetch({ url: '/info/client' })
    this.fetch({ url: '/info/firm' })
  }
  render() {
    let _ = this.props.dictionary.home
    return (
      <div className={"main-controller"}>
        <OptionsLogo/>
        <div className={"options"}>
          <Option name={_.masterData} select={_.select} icon={"contacts"}/>
          <Option name={_.selfService} select={_.select} icon={"shopping_cart"}/>
          <Option name={_.ePayroll} select={_.select} icon={"credit_card"}/>
          <Option name={_.eCafeteria} select={_.select} icon={"card_giftcard"}/>
        </div>
        <div className={"controller"}>
          <ControllerButton name={_.users} icon={"group_add"} action={()=>this.getUsers()}/>
          <ControllerButton name={_.settings} icon={"build"} action={()=>{console.log("settings")}}/>
        </div>
      </div>
    )
  }
}

export default Home

const OptionsLogo = (props) => (
  <div className={"options-logo"}>
    <h2>(MaXoft Logo)</h2>
  </div>
)

const Option = (props) => (
  <div className={"option"}>
    <div className={"icon-place"}>
      <i className="material-icons md-42">{props.icon}</i>
    </div>
    <div className={"controll-place"}>
      <p>{props.name}</p>
      <button className={"maxoft-button"}>{props.select}</button>
    </div>
  </div>
)

const ControllerButton = (props) => (
  <div>
    <button className={"maxoft-button controller-button"} onClick={props.action}>
      <i className="material-icons md-12 icon-align icon-with-space">{props.icon}</i>
      {props.name}
    </button>
  </div>
)
