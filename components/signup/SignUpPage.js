import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignUpForm from './SignUpForm.js';
import { userSignUpRequest, addFlashMessage } from '../../action/index.jsx';


class SignUpPage extends React.Component {
    render(){
        // using userSignUpRequest from action in line 10, 32
        const { userSignUpRequest, addFlashMessage } = this.props;
        return (
        <div className="d-flex justify-content-center align-items-center container">
            <div className="row">
                <div className="col-md-12 col-md-offset-4 text-right">
                    <SignUpForm userSignUpRequest={userSignUpRequest} addFlashMessage={addFlashMessage} />
                </div>
            </div>
        </div>
        )
    }
}
SignUpPage.propTypes = {
    userSignUpRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}


export default connect(null, { userSignUpRequest, addFlashMessage })(SignUpPage);