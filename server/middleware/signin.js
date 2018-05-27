import validator from 'validator';
import isEmpty from 'is-empty';


export default function validateInput(data){
    let errors = {};
    if(!validator.isEmail(data.identifier)){
        errors.identifier = "Invalid Email"
    }
    if(data.identifier == ""){
        errors.identifier = 'This field is required';
    }
    if(data.password == ""){
        errors.password = 'Password field is required';
    }
    if (!data.identifier || data.identifier.trim().length === 0) {
        errors.identifier = 'This field can not be blank';
    }
    if(!data.password){
        errors.data = 'Password Field should not be blank'
    }
    return{
        errors,
        isValid: isEmpty(errors)
        }
}


 