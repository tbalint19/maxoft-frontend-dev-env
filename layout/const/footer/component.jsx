import React from 'react'
import Container from 'container'

class Footer extends Container {
  changeLanguage(event) { this.dispatch({type: "LANGUAGE_CHANGED", language: event.target.id}) }
  render(){
    let _ = this.props.dictionary.footer
    return (
      <div className={"footer"}>
        <div className={"footer-placeholder"}></div>
        <div className={"footer-controller"}>
          <div>MaXoft Kft - {_.portal}</div>
          <div>{_.support}: +36 (1) 218 7091, maxoft@maxoft.hu</div>
          <div>
            <button id="hu" onClick={(event)=>this.changeLanguage(event)}></button>
            <button id="eng" onClick={(event)=>this.changeLanguage(event)}></button>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
