import React from 'react'
import styles from './LoginUserPage.css'
import formOnChangeHandler from '../../../helpers/formHandler/handelFormOnChange'
import auth from '../../../common/appRouter/Auth'
import {Input, Button} from 'react-materialize'
import userActions from '../../../actions/UserActions'
import credetialModelValidator from '../../../helpers/validators/credetialsModelValidator'
import userStore from '../../../stores/UserStore'
import toastr from 'toastr'

class LoginUserPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            credentials: {
                email: '',
                password: ''

            },
            error: {
                email: '',
                password: ''
            }
        }
        this.handleLoginComplete=this.handleLoginComplete.bind(this)

        userStore.on(userStore.evetTypes.USER_LOGED, this.handleLoginComplete)
    }

    componentWillUnmount(){
    userStore.removeListener(userStore.evetTypes.USER_LOGED, this.handleLoginComplete)
}
    loginUser(event) {
        event.preventDefault()
        let validationResult=credetialModelValidator(this.state.credentials);
        console.log(validationResult)
        let isValid = validationResult.isValid;
        this.state.error = validationResult.errors
        this.setState({error: this.state.error})

        if (isValid) {
            userActions.login(this.state.credentials);
        }
    }
    handleInputChange(event) {
        formOnChangeHandler(event,'credentials',this)

    }
    handleLoginComplete(data) {
        if(!data.success){
            if (data.errors) {
                this.setState({error: data.errors})
                return
            }
            toastr.error(data.message)
            return
        }
        console.log(data)
        auth.authenticateUser(data.token)
        auth.saveUser(data.user)
        toastr.success(data.message)
       this.props.history.push('/home')

    }

    render() {
        return (
            <div className={styles.container}>
                <div className="row">
                    <div className="inputContainer col-md-4 col-md-offset-4">
                        <Input
                            onChange={this.handleInputChange.bind(this)}

                            validate={true}
                            type="email"
                            label="Email"
                            name='email'/>
                        <span className="error">{this.state.error.email || ''}</span>
                    </div>
                </div>

                <div className="inputContainer col-md-4 col-md-offset-4">
                    <Input
                        onChange={this.handleInputChange.bind(this)}
                        name='password'
                        type="password"
                        label="Password"/>
                    <span className="error">{this.state.error.password || ''}</span>
                </div>

                <div className="col-md-6 col-md-offset-3">
                    <Button onClick={this.loginUser.bind(this)} waves='light'>Login</Button>
                </div>
            </div>
        )
    }
}
export default LoginUserPage