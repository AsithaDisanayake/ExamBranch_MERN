import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser,logoutUser} from './actions/authActions';
import { clearCurrentProfile } from "./actions/profileActions";

import PrivateRoute from "./components/common/PrivateRoute";


import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";


import Subject from './components/subject/Subject';
import Exam from './components/exams/Exam'; 
import EnrollSubject from './components/subjectenroll/EnrollSubject';
import MyCourses from './components/dashboard/MyCourses';
import StudentList from './components/dashboard/StudentList';
import RegisterExams from './components/registerexam/RegisterExams';
import RegisteredSubjects from './components/subjectenroll/RegisteredSubject';
import RegisteredStudents from './components/registerexam/RegisteredStudents';
import RepeatExam from './components/repeatexams/RepeatExam';


// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    //  Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}




class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App" >
            <Navbar />
            <div className = "contain">
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/view-mycourse" component={RegisteredSubjects} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/registerstudents" component={RegisteredStudents} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/repeatexams" component={RepeatExam} />
              </Switch>
             
             
              
              
             
              <Switch>
                <PrivateRoute exact path="/subject" component={Subject} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/exam" component={Exam} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/enrollsub" component={EnrollSubject} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/view-student" component={StudentList} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/register-exams" component={RegisterExams} />
              </Switch>
              </div>
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  } 
}

export default App;
  