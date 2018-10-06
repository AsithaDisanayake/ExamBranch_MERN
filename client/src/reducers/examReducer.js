import {
  ADD_EXAM,
  GET_EXAMS,
  GET_EXAM,
  DELETE_EXAM,
  EXAM_LOADING
} from '../actions/types';

const initialState = {
  exams: [],
  exam: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EXAM_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_EXAMS:
      return {
        ...state,
        exams: action.payload,
        loading: false
      };
    case GET_EXAM:
      return {
        ...state,
        exam: action.payload,
        loading: false
      };
    case ADD_EXAM:
      return {
        ...state,
        exams: [action.payload, ...state.exams]
      };
    case DELETE_EXAM:
      return {
        ...state,
        exams: state.exams.filter(exam => exam._id !== action.payload)
      };
    default:
      return state;
  }
}
