import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './types.jsx';
import setAuthorizationToken from '../utils/setAuthorizationToken.js';


export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function logout () {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

export function login(data){
    return dispatch => {
        return axios.post('http://localhost:8009/api/v1/users/signin', data)
        .then(
            res => {
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);
                //console.log(setAuthorizationToken(token))
                setAuthorizationToken(token);
                //console.log(dispatch(setCurrentUser(jwt.decode(token))))
                dispatch(setCurrentUser(jwt.decode(token)));
            }
        )
    }
}