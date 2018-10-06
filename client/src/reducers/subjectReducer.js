import {
    
    SUBJECT_LOADING,
    GET_SUBJECTS,
    GET_SUBJECT,
    DELETE_SUBJECT,
    ADD_SUBJECT,
    
    
  } from '../actions/types';
  
  const initialState = {
    subject: {},
    subjects: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SUBJECT_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_SUBJECT:
        return {
          ...state,
          subject: action.payload,
          loading: false
        };
        case GET_SUBJECTS:
        return {
          ...state,
          subjects: action.payload,
          loading: false
        };

        case ADD_SUBJECT:
        return {
          ...state,
          subjects:  [action.payload, ...state.subjects]
          
        };
      case DELETE_SUBJECT:
        return {
          ...state,
          subjects: state.subjects.filter(subject => subject._id !== action.payload)
        };  
      
      default:
        return state;
    }
  }
  