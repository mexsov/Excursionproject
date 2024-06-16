import { checkSchema } from 'express-validator';

export const createExcursionValidationSchema = checkSchema({
    name: {
        notEmpty:{
            errorMessage: "Name cannot be empty"
        },
        isString:{
            errorMessage: "Name must be a valid String"
        },
        isLength:{
            options: {min:3, max:100},
            errorMessage: "Name must be at least 3 characters with a max of 100 characters"
        }
    },  
    image_data:{
        notEmpty:{
            errorMessage: "Description cannot be empty"
        },
        isString:{
            errorMessage: "Description must be a valid String"
        },
        isLength:{
            options: {min:10, max:2000},
            errorMessage: "Description must be at least 10 characters with a max of 5000 characters"
        }
    },
    duration_minutes: {
        isInt:{
            options: {min: 1},
            errorMessage: "duration_minutes must be a valid positive integer"
        }
    },
    rating: {
        isInt:{
            options: {min: 1},
            errorMessage: "rating must be a valid positive integer"
        }
    },
    price: {
        isInt:{
            options: {min: 1},
            errorMessage: "price must be a valid positive integer"
        }
    },
    
        
    
});
