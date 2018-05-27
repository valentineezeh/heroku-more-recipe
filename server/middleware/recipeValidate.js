import validator from 'validator';
import isEmpty from 'is-empty';
   
export default function recipeValidator(data) {
    const errors = {};
    if (data.title === undefined) {
            errors.title = 'title is required'
    }
    if (data.description === undefined) {
            errors.description = 'description is required'
    }
    if (data.imageUrl === undefined) {
            errors.imageUrl = 'imageUrl is required'
    }
    if (data.title.toString().trim() === '') {
        errors.title = 'title is required'
    }
    if (data.description.toString().trim() === '') {
        errors.description = 'description can not be empty'
    }
    if (data.imageUrl.toString().trim() === '') {
        errors.imageUrl = 'Image Link can not be empty.'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }       
    
        }
    

    

    
