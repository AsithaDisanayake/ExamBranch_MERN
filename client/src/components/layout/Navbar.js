import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import logo from "../common/ucsc_logo.png";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    let authLinks;

    if (isAuthenticated && user.usertype === "student") {
      authLinks = (
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Loading..." />{" "}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register-exams">
                  {" "}
                  Register Exams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/enrollsub">
                  {" "}
                  Enroll Subject
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/repeatexams">
                  {" "}
                  Repeat Exams
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  href=""
                  onClick={this.onLogoutClick.bind(this)}
                  className="nav-link"
                >
                  <i className="fas fa-sign-out-alt" /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      );
    } else if (isAuthenticated && user.usertype === "admin") {
      authLinks = (
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Loading..." />{" "}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/subject">
                  {" "}
                  Add Courses
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/exam">
                  {" "}
                  Publish Exams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/registerstudents">
                  {" "}
                  Exam Details
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item ">
                <a
                  href=""
                  onClick={this.onLogoutClick.bind(this)}
                  className="nav-link "
                >
                  <i className="fas fa-sign-out-alt" /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      );
    } else {
      authLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              <i className="fas fa-user-plus" /> {"    "}Sign Up{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              <i className="fas fa-sign-in-alt" />
              {"  "}Login
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        {authLinks}
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
