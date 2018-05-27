 import React, { Component } from 'react';
 

 class TodoInput extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            inputText: ''
        }
    }
    deleteLetter(){
        this.setState({
            inputText: this.state.inputText.substring(0, this.state.inputText.length - 1)
        })
    }
    handleChange(event){
        this.setState({
            inputText: event.target.value
        })
    }
    // event.preventDefault();
       
        // //validations
        // let errors = {};
        // if(this.state.recipes.title === '') {errors.recipes.title = "Cant be empty"};
        // if(this.state.recipes.description === '') {errors.recipes.description = "Cant be empty"};
        // if(this.state.recipes.imageUrl === '') {errors.recipes.imageUrl = "Cant be empty"};
        // this.setState({  errors });
        // const isValid = Object.keys(errors).length  === 0;
        // if(isValid){
        //     const { title, description, imageUrl } = this.state;
        //     this.props.saveRecipe({ title, description, imageUrl })
        //     .then(
        //         () => { this.setState({ done: true })},
        //         (err) => err.response.json().then(({errors}) => 
        //         this.setState({errors}))
        //     )
        // }
     render (){
        return (
       <div>
            <input  
            type="text" style={{
                width:'70%', padding:'20px', background: '#181c22',
                border: '0', float: 'left', font: '20px', color:'#989898'
        
        }}
            placeholder="Type in your Todo"
            value={this.state.inputText}
            onChange={this.handleChange.bind(this)}
        />
        <button style={{
            padding: '20px', width: '30%',float: 'left',
            background: '#23282e', boxSizing: 'border-box',
            color: '#fff',cursor: 'pointer',font: '20px',
        }}
        >Submit</button>
        </div>
    )
     }   
 }
 export default TodoInput;