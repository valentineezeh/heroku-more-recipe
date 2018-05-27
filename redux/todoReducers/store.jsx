import { createStore } from 'redux';
import reducer from './reducer.jsx';

// add middleware later
 
export default function configureStore(initialState = { todos: []}){
    return createStore(reducer, initialState)
}