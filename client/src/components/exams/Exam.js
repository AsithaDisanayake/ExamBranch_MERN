import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddExam from "./AddExam";
import Spinner from "../common/Spinner";
import { getExams } from "../../actions/ExamActions";
import ExamFeed from "./ExamFeed";

class Exam extends Component {
  componentDidMount() {
    this.props.getExams();
  }

  render() {
    const { exams, loading } = this.props.exam;
    let examContent;

    if (exams === null || loading) {
      examContent = <Spinner />;
    } else {
      examContent = <ExamFeed exams={exams} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <AddExam />
            </div>
            <div className="col-md-12">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Exam name</th>
                    <th>Held year</th>
                    <th>Semester</th>
                    <th>Held Date</th>
                    <th>status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{examContent}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Exam.propTypes = {
  getExams: PropTypes.func.isRequired,
  exam: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  exam: state.exam
});

export default connect(
  mapStateToProps,
  { getExams }
)(Exam);
