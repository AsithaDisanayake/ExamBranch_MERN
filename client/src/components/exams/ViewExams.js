import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
 import { deleteExam } from "../../actions/ExamActions";

class ViewExams extends Component {
  onDeleteClick(id) {
    if (window.confirm("Are sure want to remove this Exam")) {
      this.props.deleteExam(id);
  } 
     
  }

  render() {
    const { exam, auth, showActions } = this.props;

    return (
      <tr>
        <td>{exam.examname}</td>
        <td>{exam.examyear}</td>
        <td>{exam.examsemester}</td>
        <td>{exam.examstartdate}</td>
        <td>{exam.status}</td>
        <td>
          {
            <button
              onClick={this.onDeleteClick.bind(this, exam._id)}
              type="button"
              className="btn btn-danger"
            >
              <span>Delete</span>
            </button>
          }
        </td>
      </tr>
    );
  }
}

ViewExams.defaultProps = {
  showActions: true
};

ViewExams.propTypes = {
  deleteExam: PropTypes.func.isRequired,
  
  exam: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteExam }
)(ViewExams);
