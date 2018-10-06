import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deleteSubject } from "../../actions/subjectActions";

class ViewSubject extends Component {
  onDeleteClick(id) {
    
    if (window.confirm("Are sure want to remove this course")) {
      this.props.deleteSubject(id);
  } 
      
   
  }

  render() {
    const { subject, auth, showActions } = this.props;

    return (
      <tr>
        <td>{subject.subjectcode}</td>
        <td>{subject.subjectname}</td>
        <td>{subject.degreetype}</td>
        <td>{subject.stream}</td>
        <td>{subject.semester}</td>
        <td>
          {
            <button
              onClick={this.onDeleteClick.bind(this, subject._id)}
              type="button"
              className="btn btn-danger"
            >
            <span> Delete</span>
             
            </button>
          }
        </td>
      </tr>
    );
  }
}

ViewSubject.defaultProps = {
  showActions: true
};

ViewSubject.propTypes = {
  deleteSubject: PropTypes.func.isRequired,

  subject: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteSubject }
)(ViewSubject);
