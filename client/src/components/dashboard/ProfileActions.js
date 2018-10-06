import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="/view-mycourse" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        My Coursese
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1" />
        Repeat Exam
      </Link>
    </div>
  );
};

export default ProfileActions;
