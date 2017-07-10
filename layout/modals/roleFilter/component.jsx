import React from 'react'
import Modal from 'modalTB'

class RoleFilter extends Modal {
  modifyFilter(role, isTrue){
    this.dispatch({type: "ROLE_MODIFIED", role: role, isTrue: isTrue})
  }
  toggleFilter(role, isTrue){
    this.dispatch({type: "ROLE_TOGGLED", role: role, isTrue: isTrue})
  }
  content(props){
    let _ = this.props.dictionary.roleFilter
    let roleParams = this.props.state.users.roleParams
    return (
      <div className={"role-filter-content"}>
        <button className={"modal-close-button"}
          onClick={()=>this.close()}>x</button>
        <h4 className={"role-filter-title"}>{_.addRoleFilters}</h4>
        <div className={"role-filter-roles"}>
          {roleParams.map((param) => (
            <Role
              key={param.role}
              param={param} _={_}
              toggle={(role, isTrue) => this.toggleFilter(role, isTrue)}
              modify={(role, isTrue) => this.modifyFilter(role, isTrue)}/>
          ))}
        </div>
      </div>
    )
  }
}

export default RoleFilter

const Role = (props) => (
  <div className={props.param.apply ? "active-filter-role" : "inactive-filter-role"}>
    <span>{props._[props.param.role]}</span>
    <div>
      <button
        onClick={()=>props.modify(props.param.role, true)}
        className={props.param.status ? "selected-role-filter role-row-button" : "unselected-role-filter role-row-button"}>{props._["yes"]}</button>
        <button
          onClick={()=>props.modify(props.param.role, false)}
          className={!props.param.status ? "selected-role-filter" : "unselected-role-filter"}>{props._["no"]}</button>
          <button className={"role-row-button"} onClick={()=>props.toggle(props.param.role, !props.param.apply)}>{props._["apply"]}</button>
    </div>
  </div>
)
