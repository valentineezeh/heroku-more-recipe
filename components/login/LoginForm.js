import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup.js'
import validateInput from '../../server/middleware/signin.js';

import { login } from '../../action/authAction.jsx'

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            identifier: '',
            password: '',
            errors: {},
            isLoading: false,
            done: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isValid(){
        const { errors, isValid } = validateInput(this.state);
        if(!isValid){
            this.setState({ errors });
        }
        return isValid;
    }

    onSubmit(e){
        e.preventDefault();
        if (this.isValid()){
            this.setState({ errors: {}, isLoading: true});
            this.props.login(this.state).then(
                (res) => {
                    this.props.addFlashMessage({
                        type: 'Success',
                        text: `Welcome ${this.state.identifier}`
                    })
                    this.setState({ done: true})},
            ).catch(
                (err) => {
                    //console.log(err)
                    this.setState({ errors: err.response.data.errors, 
                    isLoading: false})}
            )
                
                
            
        }
    }

    onChange(e){
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }


    render(){
        const { errors, identifier, password, isLoading} = this.state;
        const form =(
            <form onSubmit={this.onSubmit}>
            <h1>Login</h1>

            
            { errors.form && <Alert color="danger">{errors.form}</Alert>}
            <TextFieldGroup 
            field="identifier"
            label="Email"
            value={identifier}
            error={errors.identifier}
            onChange={this.onChange}

            />

            <TextFieldGroup 
            field="password"
            label="password"
            value={password}
            error={errors.password}
            onChange={this.onChange}
            type="password"

            />
            <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
        </form>
        )
        return(
            <div>
            {this.state.done ? <Redirect to="/"/> : form} 
        </div>
        )
    }
}

LoginForm.propsTypes = {
    login: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
}

LoginForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);