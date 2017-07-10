import React from 'react'
import Container from 'container'

class Init extends Container {
  componentDidMount(){ this.fetch({ url: '/auth/init'}) }
  render() {
    return (
      <div className={"init-loading-container"}>
        <p>...</p>
      </div>
    )
  }
}

export default Init
