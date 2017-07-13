import emailValidator from 'email-validator'

export default (userRegisterModel)=> {
    let email = userRegisterModel.email;
    let firstName = userRegisterModel.firstName;
    let lastName = userRegisterModel.lastName;
    let password = userRegisterModel.password;
    let confirmPassword = userRegisterModel.confirmPassword;
    let isValid = true;
    let errors = {
        email:'',
        firstName:'',
        lastName:'',
        password:'',
        confirmPassword:'',
    }
console.log(this.firstName)
    if (typeof email !== 'string' || !emailValidator.validate(email)){
       isValid=false;
        errors.email='Email is invalid';

    }
    if (typeof firstName !== 'string' || firstName.trim().length <3){
        isValid=false;
        errors.firstName='First name must be at least 3 symbols';

    }
    if (typeof lastName !== 'string' || lastName.trim().length <3){
        isValid=false;
        errors.lastName='Last name must be at least 3 symbols';

    }
    if (typeof password !== 'string' || password.trim().length <6){
        isValid=false;
        errors.password='Password must be at least 6 symbols';

    }
    if ( password !== confirmPassword){
       isValid=false;
        errors.confirmPassword='Confirm password not matching';

    }

    return {
        isValid:isValid,
        errors:errors
    }
        }
