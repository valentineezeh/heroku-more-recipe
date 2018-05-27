import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm.js';
import { addFlashMessage } from '../../action/index.jsx';

class LoginPage extends React.Component {
    render(){
        const { addFlashMessage } = this.props;
        return(
            <div className="d-flex justify-content-center align-items-center container">
            <div className="row">
                <div className="col-md-12 col-md-offset-4 text-right">
                    <LoginForm addFlashMessage={addFlashMessage} />
                </div>
            </div>
        </div>
        )
    }
}

LoginPage.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
}

export default connect(null, { addFlashMessage })(LoginPage);