import React from 'react'
import styles from './RegisterUserPage.css'
import {Input, Button} from 'react-materialize'
import userActions from '../../../actions/UserActions'
import registerUserModelValidator from '../../../helpers/validators/registerUserModelValidator'
import userStore from '../../../stores/UserStore'
import toastr from 'toastr'
import formOnChangeHandler from '../../../helpers/formHandler/handelFormOnChange'


class RegisterUserPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            error: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }

        }

        this.handleRegistrationComplete = this.handleRegistrationComplete.bind(this)
        userStore.on(userStore.evetTypes.USER_REGISTERD, this.handleRegistrationComplete)


    }



    handleInputChange(event) {
        formOnChangeHandler(event,'user',this)
        // const target = event.target
        // const field = target.name
        // const value = target.value
        // const user = this.state.user
        // user[field] = value;
        // this.setState({user})

    }

    registerUser(event) {
        event.preventDefault()
        let isValid = registerUserModelValidator(this.state.user).isValid;
        this.state.error = registerUserModelValidator(this.state.user).errors
        this.setState({error: this.state.error})
        if (isValid) {
            userActions.register(this.state.user);
        }

    }

    handleRegistrationComplete(data) {
     if(!data.success){
         if (data.errors) {
             this.setState({error: data.errors})
             return
         }
         toastr.error(data.message)
         return
     }
        toastr.success(data.message)
        this.props.history.push('login')

    }

    componentWillUnmount() {
        console.log('remve list')
        userStore.removeListener(userStore.evetTypes.USER_REGISTERD, this.handleRegistrationComplete)
    }

    render() {
        return (
            <div >
                <div className="row">
                    <div className="inputContainer col-md-6 col-md-offset-3">
                        <Input
                            onChange={this.handleInputChange.bind(this)}

                            validate={true}
                            type="email"
                            label="Email"
                            name='email'/>
                        <span className="error">{this.state.error.email || ''}</span>
                    </div>
                </div>
                <div className="row">

                    <div className="inputContainer col-md-3 col-md-offset-3">
                        <Input
                            onChange={this.handleInputChange.bind(this)}
                            name='firstName'
                            validate={true}


                            label="First Name"/>
                        <span className="error">{this.state.error.firstName || ''}</span>
                    </div>
                    <div className="inputContainer col-md-3 ">
                        <Input
                            onChange={this.handleInputChange.bind(this)}
                            name='lastName'

                            label="Last Name"/>
                        <span className="error">{this.state.error.lastName || ''}</span>
                    </div>
                </div>

                <div className="inputContainer col-md-3 col-md-offset-3">
                    <Input
                        onChange={this.handleInputChange.bind(this)}
                        name='password'

                        type="password"
                        label="Password"/>
                    <span className="error">{this.state.error.password || ''}</span>
                </div>
                <div className="inputContainer col-md-3 ">
                    <Input
                        onChange={this.handleInputChange.bind(this)}
                        name='confirmPassword'

                        type="password"
                        label="Confirm password"/>
                    <span className="error">{this.state.error.confirmPassword || ''}</span>
                </div>

                <div className="col-md-6 col-md-offset-3">
                    <Button onClick={this.registerUser.bind(this)} waves='light'>Register</Button>
                </div>

            </div>
        )
    }
}
export default RegisterUserPage