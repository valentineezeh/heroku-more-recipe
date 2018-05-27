import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { RecipesPage, RecipeForm } from '../components/recipe/index.js';
import SignUpPage from '../components/signup/SignUpPage.js';
import FlashMessagesList from '../components/flash/flashMessagesList.js'
import LoginPage from '../components/login/LoginPage.js'
import HomePage from '../components/home/homePage.js'
import NavigationBar from '../components/NavigationBar.js';
import requiredAuth from "../utils/requiredAuth.js";



class App extends React.Component {
    render() {
      return (
      <div>  
          <NavigationBar />,
          <FlashMessagesList />
        
          <div>
            <Route exact path="/recipes" component={requiredAuth(RecipesPage)} />
            <Route path="/recipes/new" component={requiredAuth(RecipeForm)} />
            <Route path="/recipe/:id" component={requiredAuth(RecipeForm)} />
            <Route path="/user/signUp" component={SignUpPage} />
            <Route exact path="/" component={HomePage} />
            <Route path="/user/login" component={LoginPage} />
        </div>
       </div> 
        
      )
    }
  }

export default App;