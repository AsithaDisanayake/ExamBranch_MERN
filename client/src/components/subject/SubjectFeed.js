import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ViewSubject from './ViewSubject';

class SubjectFeed extends Component {
  render() {
   
    const { subjects } = this.props;
    
    return subjects.map(subject => <ViewSubject key={subject._id} subject={subject} />);
  }
  
}

SubjectFeed.propTypes = {
  subjects: PropTypes.array.isRequired
};

export default SubjectFeed;
