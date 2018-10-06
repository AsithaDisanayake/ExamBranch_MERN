import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { addRepeat } from "../../actions/profileActions";

class ViewSubject extends Component {

  
 

  onEnrollClick(id,subject) {
    if (window.confirm("Are sure want to Select this Subject")) {  

    const subjectData = {
      subjectid: subject.id,
      subjectcode: subject.subjectcode,
      subjectname: subject.subjectname,  
      subjectsemester: subject.semester,  
    };
    // console.log(subjectData);
    this.props.addRepeat(subjectData);
      // this.props.addRepeat(id);
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
              onClick={this.onEnrollClick.bind(this, subject._id,subject)}
              type="button"
              className="btn btn-submit"
            >
              <span>Select</span>
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
  addRepeat: PropTypes.func.isRequired,
  
  subject: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addRepeat }
)(ViewSubject);
