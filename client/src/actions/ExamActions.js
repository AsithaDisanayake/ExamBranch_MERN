import axios from 'axios';

import {
  GET_EXAM,
  GET_EXAMS,
  EXAM_LOADING, 
  GET_ERRORS,
  ADD_EXAM,
  CLEAR_ERRORS,
  DELETE_EXAM
  
} from './types';



// Create Exam
export const createExam = ( newExam )=> dispatch => {   
  dispatch(clearErrors());  
  axios
    .post('/api/exams/exam', newExam)
    .then(res =>
      dispatch({
        type: ADD_EXAM,
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

//Get Exams

export const getExams = () => dispatch => {  
  dispatch(setExamLoading());
  axios
    .get('/api/exams/')
    .then(res =>
      dispatch({
        type: GET_EXAMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EXAMS,
        payload: {}
      })
    );
};

// Get Exam
export const getExam = id => dispatch => {
  dispatch(setExamLoading());
  axios
    .get(`/api/exams/${id}`)
    .then(res =>
      dispatch({
        type: GET_EXAM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EXAM,
        payload: null
      })
    );
};

// Delete Exam
export const deleteExam = id => dispatch => {
  axios
    .delete(`/api/exams/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_EXAM,
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

export const registerExam = id => dispatch => {
  axios
    .post(`/api/exams/register/${id}`)
    .then(res =>
      dispatch({
        type: GET_EXAM,
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



export const setExamLoading = () => {
  return {
    type: EXAM_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};