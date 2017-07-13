import React from 'react'
import Auth from '../../../common/appRouter/Auth'
import toastr from 'toastr'
import styles from './UserLogOut.css'
class UserLogOut extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.logout()
  }
  logout(){

    Auth.deauthenticateUser()
    toastr.warning('You just logged out')
    this.props.history.push('/home')
  }
  render(){
    return null
  }
}
export default UserLogOut