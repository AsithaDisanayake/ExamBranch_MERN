import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import logo from "../common/ucsclogo.png";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner ">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div>
                  <br/> <br/> <br/> <br/>
                  <img src={logo} alt="Loading..." />
                  <h6 className="display-4 mb-3">Examination Branch</h6>
                </div>
                <p className="lead"> </p>
                <hr />
                <Link to="./register" className="btn btn-lg btn-info mr-2">
                  Sign Up{" "}
                </Link>
                <Link to="./login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
