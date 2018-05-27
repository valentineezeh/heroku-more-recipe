import axios from 'axios';

export function userSignUpRequest(userData) {
    return dispatch => {
        return axios.post('http://localhost:8009/api/v1/users/signup', userData);
    }
}