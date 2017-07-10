import React from 'react'

class Container extends React.Component{
  constructor(props){
    super(props)
    this.controller = props.controller
  }
  dispatch(action){
    this.controller.dispatch(action)
  }
  report(url, data){
    this.controller.report(url, data)
  }
  fetch(url){
    this.controller.fetch(url)
  }
}

export default Container
