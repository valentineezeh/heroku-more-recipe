import React from 'react';
import { Route, IndexRoute } from 'react-router-dom';
import App from '../components/App.js'

import Greetings from '../components/Greetings.js'

class Routes extends React.Component{
   render(){
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Greetings} />
        </Route>
    )
   } 
} 
export default Routes;