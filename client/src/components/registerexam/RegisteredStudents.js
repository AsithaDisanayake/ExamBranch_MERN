import React, { Component } from "react";
import { connect } from "react-redux";
import { getExams } from "../../actions/ExamActions";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";

class RegisteredSubject extends Component {
  componentDidMount() {
    this.props.getExams();
  }

  render() {
    const { profile, loading } = this.props.profile;

    let coursecontent;

    if (profile === null || loading) {
      coursecontent = <Spinner />;
    } else {
      const list = profile.courses.map(obj => (
        <tr key={obj._id}>
          <td>{obj.subjectcode}</td>
          <td>{obj.subjectname}</td>
          <td>{obj.subjectsemester}</td>
        
          <td>
            <button type="button" className="btn btn-danger">
              <span >delete</span >
            </button>
          </td>
        </tr>
      ));

      coursecontent = (
        <div className="col-md-6">
        <h1>My Courses</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th >subjectcode</th>
              <th >subjectname</th>
              <th >Semester</th>             
              <th>action</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
        </div>
      );
    }

    return <div>{coursecontent}</div>;
  }
}
RegisteredSubject.propTypes = {
  getExams: PropTypes.func.isRequired,
 
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getExams }
)(RegisteredSubject);
