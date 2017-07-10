import React from 'react'
import ReactDOM from 'react-dom'

require('maxoftStyle')
require('./layout/style')

import core from './core/controller'
import Layout from './layout/root'

const appContainer = document.getElementById('app')

const render = () => {
  console.log("App re-rendered");
  let controller = core.controller
  let data = controller.getState().data
  let state = controller.getState().state
  let dictionary = controller.getState().dictionary
  ReactDOM.render(<Layout data={data} state={state} dictionary={dictionary} controller={controller}/>, appContainer)
}

core.controller.subscribe(render)
render()
