import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
 import { registerExam } from "../../actions/ExamActions";

class ViewExams extends Component {
  onRegisterClick(id) {
    if (window.confirm("Are sure want to Register the this Exam")) {
      this.props.registerExam(id);
  } 
     
  }

  render() {
    const { exam, auth } = this.props;

    return (
      <tr>
        <td>{exam.examname}</td>
        <td>{exam.examyear}</td>
        <td>{exam.examsemester}</td>
        <td>{exam.examstartdate}</td>
        
        <td>
          {
            <button
              onClick={this.onRegisterClick.bind(this, exam._id)}
              type="button"
              className="btn btn-default"
            >
              <span>register</span>
            </button>
          }
        </td>
      </tr>
    );
  }
}



ViewExams.propTypes = {
  registerExam
  : PropTypes.func.isRequired,
  
  exam: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerExam
   }
)(ViewExams);
