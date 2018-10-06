import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import Moment from 'react-moment';


class MyCourses extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }
  render() {
    const courses = this.props.courses.map(course => (
      <tr key={course._id}>
        <td>{course.subjectcode}</td>
        <td>{course.subjectname}</td>
        <td>{course.subjectsemester}</td> 
        
        
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">My courses</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Course code</th>
              <th>course name</th>
              <th>semester</th>
              <th />
            </tr>
            {courses}
          </thead>
        </table>
      </div>
    );
  }
}

MyCourses.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, {  })(MyCourses);
