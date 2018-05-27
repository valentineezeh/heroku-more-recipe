import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class FlashMessage extends React.Component {
    constructor(props){
        super(props);
        
    }
    onClick() {
        this.props.deleteFlashMessage(this.props.message.id);
    }

    render(){
        const { id, type, text } = this.props.message;
        return (
            <div style= {{ color: "#00FF00" }} className={classnames('alert', {
                'alert-success': type === 'success',
                'alert-danger': type === 'error'
            })}>
            <button onClick={this.onClick.bind(this)} className="close"><span>&times;</span></button>
                {text}
            </div>
        )
    }
}
FlashMessage.propTypes = {
    message:  PropTypes.object.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
}

export default FlashMessage;