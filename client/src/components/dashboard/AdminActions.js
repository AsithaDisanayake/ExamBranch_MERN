import React from 'react';
import { Link } from 'react-router-dom';

const AdminActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/view-student" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Students
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-file text-info mr-1" />
        Current Exam Reports
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-redo text-info mr-1 " />
        Repeat Exams Details
      </Link>
    </div>
  );
};

export default AdminActions;
