import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import AddSubject from "./AddSubject";
import Spinner from "../common/Spinner";
import { getSubject } from "../../actions/subjectActions";
import SubjectFeed from "./SubjectFeed";
import RegisteredSubject from "./RegisteredSubject";

class RepeatExam extends Component {
  componentDidMount() {
    this.props.getSubject();
  }
  
  render() {
    const { subjects, loading } = this.props.subject;
    let subjectContent;
   
    if (subjects === null || loading) {
      subjectContent = <Spinner />;
    } else {
      
      subjectContent = <SubjectFeed subjects={subjects} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            
            <div className="col-md-12">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Subject Code</th>
                    <th>Subject Name</th>
                    <th>Degree type</th>
                    <th>Stream</th>
                    <th>Semester</th>
                    <th>Select Subject</th>
                  </tr>
                </thead>
                <tbody>{subjectContent}</tbody>
              </table>
            </div>
            <div className="col-md-12">
              <RegisteredSubject />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RepeatExam.propTypes = {
  getSubject: PropTypes.func.isRequired,
  subject: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  subject: state.subject
});

export default connect(
  mapStateToProps,
  { getSubject }
)(RepeatExam);
