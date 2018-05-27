import React from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { Redirect } from 'react-router-dom';
import { Alert } from 'reactstrap';
import validateSignUp from '../../server/middleware/signUpValid.js';



class SignUpForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fullName: '',
            email: '',
            sex: '',
            userName: '',
            password: '',
            confirmPassword: '',
            errors: {},
            isLoading: false,
            done: false,

        }
    }
    handleChange(event){
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }
    isValid(){
        const { errors, isValid } = validateSignUp(this.state);
        if(!isValid){
            this.setState({ errors })
        }
        return isValid;
    }
    handleSubmit(event){
        
        event.preventDefault();
        if(this.isValid()){
            this.setState({ errors: {}, isLoading: true });
            this.props.userSignUpRequest(this.state)
            .then(
                (res) => {
                    this.props.addFlashMessage({
                        type: 'Success',
                        text: 'You have Signed Up Successfully. Welcome!!'
                    })
                    this.setState({ done: true})},
                ).catch(
                    (err) => {
                        this.setState({ 
                        errors: err.response.data.errors, isLoading: false })
                    }
                )
        }
       
        
    }

    render(){
        const { errors, email, fullName, userName, sex, password, confirmPassword } = this.state;
        const form = (
            <form onSubmit={this.handleSubmit.bind(this)}>
            <h1>Join Our Community</h1>

            { errors.form && <Alert color="danger">{errors.form}</Alert>}
              <TextFieldGroup
              error= { errors.fullName }
              label="Full Name"
              onChange={this.handleChange.bind(this)}
              value={fullName}
              field="fullName"
              
              />

              <TextFieldGroup
              error= { errors.email }
              label="email"
              onChange={this.handleChange.bind(this)}
              value={email}
              field="email"
              
              />

              <TextFieldGroup
              error= { errors.userName }
              label="User Name"
              onChange={this.handleChange.bind(this)}
              value={userName}
              field="userName"
              
              />

              <TextFieldGroup
              error= { errors.sex }
              label="sex"
              onChange={this.handleChange.bind(this)}
              value={sex}
              field="sex"
              />

              <TextFieldGroup
              error= { errors.password }
              label="password"
              onChange={this.handleChange.bind(this)}
              value={password}
              field="password"
              type="password"
              />

            <TextFieldGroup
              error= { errors.confirmPassword }
              label="Confirm Password"
              onChange={this.handleChange.bind(this)}
              value={confirmPassword}
              field="confirmPassword"
              type="password"
              />

            <div className="form-group">
                <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Sign Up</button>
            </div>
        </form>
        )
        return (
            <div>
            {this.state.done ? <Redirect to="/"/> : form} 
        </div>
        )
    }
}

SignUpForm.propTypes = {
    userSignUpRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
}
export default SignUpForm;