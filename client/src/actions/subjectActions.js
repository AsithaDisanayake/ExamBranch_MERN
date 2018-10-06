import axios from 'axios';

import {
  // GET_SUBJECT,
  GET_SUBJECTS,
  SUBJECT_LOADING, 
  GET_ERRORS,
  ADD_SUBJECT,
  CLEAR_ERRORS,
  DELETE_SUBJECT,
  GET_SUBJECT
  
} from './types';



// Create Subject
export const createSubject = ( newSubject )=> dispatch => {   
  dispatch(clearErrors());
  
  axios
    .post('/api/subject/subject', newSubject)
    .then(res =>
      dispatch({
        type: ADD_SUBJECT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
     
    
};

//Get Subjects

export const getSubject = () => dispatch => {  
  dispatch(setSubjectLoading());
  axios
    .get('/api/subject/all')
    .then(res =>
      dispatch({
        type: GET_SUBJECTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SUBJECTS,
        payload: {}
      })
    );
};

// Get Subject
export const getaSubject = id => dispatch => {
  dispatch(setSubjectLoading());
  axios
    .get(`/api/subject/${id}`)
    .then(res =>
      dispatch({
        type: GET_SUBJECT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SUBJECT,
        payload: null
      })
    );
};

// Delete Post
export const deleteSubject = id => dispatch => {
  axios
    .delete(`/api/subject/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_SUBJECT,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setSubjectLoading = () => {
  return {
    type: SUBJECT_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};