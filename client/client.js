import React from 'react';
import ReactDOM from 'react-dom';
// import configureStore from '../redux/store.jsx';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import rootReducer from '../redux/rootReducer.jsx';
import App from './App';
import setAuthorizationToken from '../utils/setAuthorizationToken.js'
import { setCurrentUser } from '../action/authAction.jsx';


const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

if (localStorage.jwtToken){
    //console.log(setAuthorizationToken(localStorage.jwtToken))
    //console.log((jwt.decode(localStorage.jwtToken)))
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

    



ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
         <App />
      </Provider> 
    </BrowserRouter>,
    document.getElementById('app')
)