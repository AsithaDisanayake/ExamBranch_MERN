import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ViewExams from './ViewExams';

class ExamFeed extends Component {
  render() {
   
    const { exams } = this.props;
    // console.log(exams);
    // return 0;
    return exams.map(exam => <ViewExams key={exam._id} exam={exam} />);
  }
  
}

ExamFeed.propTypes = {
  exams: PropTypes.array.isRequired
};

export default ExamFeed;
