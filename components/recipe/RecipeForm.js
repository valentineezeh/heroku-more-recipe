import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { saveRecipe, fetchRecipe, updateRecipe } from '../../action/index.jsx'
//import {updateRecipe} from '../../action/updateRecipe.jsx'
import styles from './style.js'

class RecipeForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
                id: this.props.recipe ? this.props.recipe.id : null,
                title: this.props.recipe ? this.props.recipe.title : '',
                description: this.props.recipe ? this.props.recipe.description : '',
                imageUrl: this.props.recipe ? this.props.recipe.imageUrl : '',
                errors:{},
                loading: false,
                done: false,
        }
    }
    
    componentWillReceiveProps (nextProps){
        //console.log(nextProps.recipe)
        this.setState({
            id: nextProps.recipe.id,
            title: nextProps.recipe.title,
            description: nextProps.recipe.description,
            imageUrl: nextProps.recipe.imageUrl,

        })
    }

    componentDidMount ()  {
        if(this.props.match.params.id){
            //console.log(this.props.match.params.id);
            this.props.fetchRecipe(this.props.match.params.id)
        }
    }

    handleChange(event) {
        // this.setState({ [event.target.name] : event.target.value });
        // console.log('updatedRecipe: ' + event.target.id + ' == '+ event.target.value )
        if (!!this.state.errors[event.target.name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            // console.log(errors)
            this.setState({
                [event.target.name]: event.target.value,
                 errors
            })
        }else{
            //console.log(this.state)
            
            this.setState({
                   [event.target.name]: event.target.value,
                
            // let handleChange = Object.assign({}, this.state);
            // handleChange[event.target.id] = event.target.value;
            // this.setState({
            //     recipes: handleChange,
        })    
        
    }
}

    handleSubmit(e){
        e.preventDefault();

        let errors = {};
        if (this.state.title === '') errors.title = "Can't be empty";
        if (this.state.description === '') errors.description = "Can't be empty";
        if (this.state.imageUrl === '') errors.imageUrl = "Can't be empty";
        
        this.setState({ 
            errors 
        })
        const isValid = Object.keys(errors).length === 0

        if(isValid){
            const { id, title, description, imageUrl } = this.state;
            //console.log(this.state)
            this.setState({ loading: true });
            if(id){
                //console.log(id)
                //console.log(this.props.updateRecipe({ id, title, description, imageUrl }))
                this.props.updateRecipe(this.state,
                    this.context.router.history.push('/recipes')
                );
                
                
            }else{
                this.props.saveRecipe(this.state ).then(
                    (res) => {
                        this.props.addFlashMessage({
                            type: 'Success',
                            text: `Recipe with name ${ this.state.title } has been Created`
                        })
                        this.setState({ done: true })
                    }
                )
            
            }
            
        }
        // console.log('submitRecipe: ' + JSON.stringify(this.state.recipes))
        // let updatedList = Object.assign([], this.state.list)
        // updatedList.push(this.state.recipes)
        // console.log(this.state.list)
        // this.setState({
        //     list: updatedList
        // })

    }

    render() {
        const form = (
            
            <div className="d-flex justify-content-center align-items-center container">
            <form className={classnames({ loading: this.state.loading })}>
            <h1 style={styles.header}>Add New Recipe</h1>

            {/* This is where the problem is */}
            {/* {!!this.state.errors.global && <Alert color="danger">{this.state.errors.global }</Alert>} */}
              <div className="form-group row">
                <div className="form-group col-md-12 col-md-offset-8 text-right">
                <div className={classnames('field', { error: !!this.state.errors.title})}>
                    <label htmlFor="title">Recipe Title</label>
                    <input 
                    name="title" 
                    value={this.state.title} 
                    onChange={this.handleChange.bind(this)}
                    className="form-control" 
                    id="title" 
                    placeholder="title"/>
                    <span style={{color: "#ae5856"}} >{this.state.errors.title}</span>
                </div>
                <div className={classnames('field', { error: !!this.state.errors.description})}>
                
                    <label htmlFor="title">Recipe Description</label>
                    <textarea 
                    name="description" 
                    value={this.state.description} 
                    onChange={this.handleChange.bind(this)}
                    className="form-control" 
                    id="description" 
                    placeholder="description"/>
                   <span style={{color: "#ae5856"}}>{this.state.errors.description}</span>
                </div>
                <div className={classnames('field', { error: !!this.state.errors.imageUrl})}>
                
                    <label htmlFor="imageUrl">Recipe Image</label>
                    <input 
                    name="imageUrl" 
                    value={this.state.imageUrl}
                    onChange={this.handleChange.bind(this)}  
                    className="form-control" 
                    id="imageUrl" 
                    placeholder="Image"/>
                   <span style={{color: "#ae5856"}}>{this.state.errors.imageUrl}</span>
                </div>
                <div>
                    {this.state.imageUrl !== '' && <img src={this.state.imageUrl} alt="" className="img-rounded"/>}
                </div>
                <div>
                <button onClick={this.handleSubmit.bind(this)} type="submit" className="btn btn-primary">Submit</button>
                </div>
                </div>
                </div>
          </form>
          </div>
        );

        
        return (
            
           <div>
               {this.state.done ? <Redirect to="/recipes"/> : form} 
           </div>
    

        )
    }
}
RecipeForm.propTypes = {
    saveRecipe: PropTypes.func.isRequired,
    updateRecipe: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    
}

RecipeForm.contextTypes = {
    router: PropTypes.object.isRequired
}

function mapStateToProps(state, props){
    //console.log(props.match.recipe)
    if(props.match.params.id){
    //console.log(props.match.params.id)
    let recipe = {}
    const recipes = state.recipes.filter(item => {
        //console.log(item)
        //console.log(state.recipes)
        if (item.id == props.match.params.id){
            recipe = item
        }
    })
            //console.log(recipe)
        return {
            recipe
        }  
        
        //console.log(recipe);
    }
    return { recipe: null };
}

export default connect(mapStateToProps, { saveRecipe, fetchRecipe, updateRecipe }) (RecipeForm);