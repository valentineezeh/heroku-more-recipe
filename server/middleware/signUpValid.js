import validator from 'validator';
import isEmpty from 'is-empty';


  export default function validateSignUp (data) {
    const errors = {};
    if (data.email == undefined) {
      errors.email = "Email is empty"
    }
    if (!validator.isEmail(data.email)) {
      errors.email = "Invalid Email"
    }
    if (!validator.isAlpha(data.fullName.trim())) {
      errors.fullName = "Full Name should an Alphabet."
    }
    if (data.fullName === '') {
      errors.fullName = "Full Name should not be empty."
    }
    if (data.fullName <= 1) {
      errors.fullName = "Full Name should be more than One character"
    }
    if (!validator.isAlpha(data.userName.trim())) {
      errors.userName = 'Username must be alphabetic'
    }
    if (data.userName == '') {
      errors.userName = 'Username cannot be empty'
    }
    if (data.userName <= 1) {
      errors.userName = 'Length of the Username should be greater than 1 character..';
      
    }
    //=============================================
    if (!validator.isAlpha(data.sex)) {
      errors.sex = 'Sex must be alphabetic';
    }
    if (data.sex == '') {
      errors.sex = 'Sex cannot be empty';
    }
    if (data.sex <= 1) {
      errors.sex = 'Length of the Sex should be greater than 1 character..';
    }
    //===============================================
    if (data.password == undefined) {
      errors.password = 'Valid Password required...';
    }
    if (data.password.length <= 6) {
      errors.password = 'Password must exceed 6 characters..';
    }
    if (data.password != data.confirmPassword) {
      errors.password = 'Mismatch Password';
    }
    return {
      errors,
      isValid: isEmpty(errors)
    }
    
  }



