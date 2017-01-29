import React, {Component} from 'react'
import DayPicker, {DateUtils} from "react-day-picker"
import {Radio, RadioGroup, Switch} from "@blueprintjs/core"
import {DateInput} from '@blueprintjs/datetime'
import 'moment/locale/ko'
import MomentLocaleUtils from 'react-day-picker/moment'
import {connect} from 'react-redux'
import {signin} from './actions'

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isNameAlert: false,
      isUsernameAlert: false,
      isPasswordAlert: false,
      isPasswordConfirmAlert: false,
      isPhonenumberAlert: false,
      isSuccess: false,
      username: '',
      last_name: '',
      password: '',
      phone_number: '',
      date_of_birth: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
    }
  }
  onNameBlur(event) {
    var last_name = event.target.value.toString()
    if(!last_name.trim()) {
      this.setState({isNameAlert: true})
    }
    else {
      this.setState({isNameAlert: false})
      this.setState({last_name})
    }
  }
  onUsernameBlur(event) {
    var username = event.target.value.toString()
    if(!username.trim()) {
      this.setState({isUsernameAlert: true})
    }
    else {
      this.setState({isUsernameAlert: false})
      this.setState({username})
    }
  }
  onPasswordBlur(event) {
    var password = event.target.value.toString()
    if(!password || password.length < 8){
      this.setState({isPasswordAlert: true})
    }
    else {
      this.setState({isPasswordAlert: false})
      this.setState({password})
    }
  }
  onPasswordConfirmBlur(event) {
    var passwordConfirm = event.target.value.toString()
    if(!passwordConfirm.trim() || passwordConfirm !== this.state.password) {
      this.setState({isPasswordConfirmAlert: true})
    }
    else {
      this.setState({isPasswordConfirmAlert: false})
    }
  }

  onPhonenumberBlur(event) {
    var phone_number = event.target.value.toString()
    if(phone_number.match(/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/)){
      this.setState({isPhonenumberAlert: false})
      this.setState({phone_number})
    }
    else {
      this.setState({isPhonenumberAlert: true})
    }
  }
  onSubmitClick(event) {
    this.props.signin(this.state)
    .then(res => {
      if (res === 204)  { //create success
        this.setState({isSuccess: true})
      }
    })
  }

  render() {
    return (
      <div className="club-page">
        { this.state.isSuccess ? 
          <div className="container join-success">
            <h3> 가입 ㅊㅊ </h3>
            <h3> 인증 ㄱㄷ </h3>
          </div> :
          <div className="club-join-container">
            <h1 className="club-join-title"> 너, CIA에 들어와라! </h1>
            <div className="club-join-content">
              <div className="club-join">
                <div className="club-join-form"> {/* ----------name  */ }
                  <strong> 이름 </strong>
                  <input type="text" 
                    className={this.state.isNameAlert ? "club-join-input pt-input pt-intent-danger" : "club-join-input pt-input .modifier" }
                      onBlur={this.onNameBlur.bind(this)} />
                  {this.state.isNameAlert && 
                    <span role="alert" className="club-join-input-error"> <small>
                      이 칸은 비어있으면 안 됨 </small> </span> }
                </div>
                <div className="club-join-form"> {/* ---------- username  */ }
                  <strong> 아이디 </strong>
                  <input type="text" 
                    className={this.state.isUsernameAlert ? "club-join-input pt-input pt-intent-danger" : "club-join-input pt-input .modifier" }
                      onBlur={this.onUsernameBlur.bind(this)} />
                  {this.state.isUsernameAlert && 
                    <span role="alert" className="club-join-input-error"> <small>
                      이 칸은 비어있으면 안 됨 </small> </span> }
                </div>
                <div className="club-join-form"> {/* ---------- password  */ }
                  <strong> 패스워드 </strong>
                  <input type="password"
                    className={this.state.isPasswordAlert ? "club-join-input pt-input pt-intent-danger" : "club-join-input pt-input .modifier" }
                      onBlur={this.onPasswordBlur.bind(this)} />
                  {this.state.isPasswordAlert && 
                    <span role="alert" className="club-join-input-error"> <small>
                      너무 짧음 (8자이상) </small> </span> }
                </div>
                <div className="club-join-form"> {/* ---------- password confirm */ }
                  <strong> 패스워드 (재입력) </strong>
                  <input type="password"
                    className={this.state.isPasswordConfirmAlert ? "club-join-input pt-input pt-intent-danger" : "club-join-input pt-input .modifier" }
                      onBlur={this.onPasswordConfirmBlur.bind(this)} />
                  {this.state.isPasswordConfirmAlert && 
                    <span role="alert" className="club-join-input-error"> <small>
                       불일치</small> </span> }
                </div>
                <div className="club-join-form"> {/* ---------- phone number */ }
                  <strong> 폰 번호 </strong>
                  <input type="text"
                    className={this.state.isPhonenumberAlert ? "club-join-input pt-input pt-intent-danger" : "club-join-input pt-input .modifier" }
                    placeholder="010-0000-0000"
                    onBlur={this.onPhonenumberBlur.bind(this)} />
                  {this.state.isPhonenumberAlert && 
                    <span role="alert" className="club-join-input-error"> <small>
                      ㅈㅅ 다시입력하셈(010-0000-0000) </small> </span> }
                </div>
                <div className="club-join-form"> {/* ---------- birthday confirm */ }
                  <strong> 생일 </strong>
                  <DateInput
                    onChange={ date_of_birth => this.setState({date_of_birth})}
                    locale="ko"
                    closeOnSelection={true}
                    disabled={false}
                    format="YYYYMMDD"
                    openOnFocus={true}
                    defaultValue={this.state.date_of_birth}
                    minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 40))}
                    maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 17))}
                  />
                </div>
                <div className="club-join-form">
                  <button type="button" 
                    className="pt-button club-join-input pt-intent-primary .modifier"
                    onClick={this.onSubmitClick.bind(this)}> 
                    환영해요 </button>
                </div>
               </div>
               <div className="club-side-content">
                 동아리 소개
               </div>
             </div>
           </div>
         }
      </div>
  )
  }
}

Signin.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = ({
  signin
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
