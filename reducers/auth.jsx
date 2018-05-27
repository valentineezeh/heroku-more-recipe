import isEmpty from 'is-empty';
import { SET_CURRENT_USER } from '../action/types.jsx'

const initialState = {
    isAuthenticated: false,
    user: {},
    
}



export default function auth(state = initialState, action = {}) {
    switch(action.type) {
        
        case SET_CURRENT_USER:
        return {
            isAuthenticated: !isEmpty(action.user),
            user: action.user
        }
        default: return state; 
    }
}