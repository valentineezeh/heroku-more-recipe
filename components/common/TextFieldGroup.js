import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const TextFieldGroup = ({ field, value, label, error, type, onChange }) => {
    return (
        
            // <div className="form-group" >
            //         <label className="control-label">{label}</label>
            //         <input
            //         value={value}
            //         onChange={onChange}
            //         type={type}
            //         name={field}
            //         className="form-control"
            //         />
            //         { error && <span style={{color: "#ae5856"}} className="help-block">{error}</span> }
            //     </div>
        <div>
            
            <FormGroup>
                <Label className="control-label">{label}</Label>
                <Input 
                type={type} 
                name={field} 
                value={value} 
                onChange={onChange}
                />
                
            { error && <span style={{color: "#ae5856"}} className="help-block">{error}</span> }  
            </FormGroup>
            
            

        </div>
       
    );
}

TextFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    label: PropTypes.string.isRequired,
    error: PropTypes.string
}

TextFieldGroup.defaultProps = {
    text: 'text'
}

export default TextFieldGroup;