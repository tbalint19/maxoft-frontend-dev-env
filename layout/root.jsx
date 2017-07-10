import React from 'react'

import ViewDependencies from 'viewDependencies'

import Init from './init/component'

import NavBar from './const/navbar/component'
import Footer from './const/footer/component'

import Home from './apps/home/component'
import Login from './apps/login/component'
import Admin from './apps/admin/component'

import NewUser from './modals/newUser/component'
import RoleEditor from './modals/roleEditor/component'
import RoleFilter from './modals/roleFilter/component'
import ResetPassword from './modals/resetPassword/component'

class Layout extends React.Component{
  render(){
    let controller = this.props.controller
    let data = this.props.data
    let state = this.props.state
    let dictionary = this.props.dictionary
    return(
      <div className="app">
        <ViewDependencies/>

        {!state.appReady && <Init controller={controller}/>}

        {state.appReady && <NavBar data={data} state={state} dictionary={dictionary} controller={controller}/>}
        {/* Apps */}
        {(state.appReady && state.app == "login") && <Login data={data} state={state} controller={controller} dictionary={dictionary}/>}
        {(state.appReady && state.app == "home") && <Home data={data} state={state} controller={controller} dictionary={dictionary}/>}
        {(state.appReady && state.app == "admin") && <Admin data={data} state={state} controller={controller} dictionary={dictionary}/>}

        {state.appReady &&<Footer data={data} state={state} dictionary={dictionary} controller={controller}/>}


        {/* Modals */}
        {(state.appReady && state.modal == "newUser") && <NewUser data={data} state={state} controller={controller} dictionary={dictionary}/>}
        {(state.appReady && state.modal == "roleEditor") && <RoleEditor data={data} state={state} controller={controller} dictionary={dictionary}/>}
        {(state.appReady && state.modal == "roleFilter") && <RoleFilter data={data} state={state} controller={controller} dictionary={dictionary}/>}
        {(state.appReady && state.modal == "resetPassword") && <ResetPassword data={data} state={state} controller={controller} dictionary={dictionary}/>}


      </div>
    )
  }
}

export default Layout
