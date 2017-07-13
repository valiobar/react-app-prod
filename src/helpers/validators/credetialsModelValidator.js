import emailValidator from 'email-validator'

export default (creadetialsModel)=> {
    let email = creadetialsModel.email;
    let password = creadetialsModel.password;
    let isValid = true;
    let errors = {
        email:'',
        password:'',
    }

    if (typeof email !== 'string' || !emailValidator.validate(email)){
       isValid=false;
        errors.email='Email is invalid';

    }

    if (typeof password !== 'string' || password.trim().length <6){
        isValid=false;
        errors.password='Password must be at least 6 symbols';

    }


    return {
        isValid:isValid,
        errors:errors
    }
        }
