import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
// import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      handle: '',
      namewithinit: '',
      fullname: '',
      contactno: '',
      degreetype: '',
      field: '',
      semester: '',      
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      namewithinit: this.state.namewithinit,
      fullname: this.state.fullname,
      contactno: this.state.contactno,
      degreetype: this.state.degreetype,
      field: this.state.field,
      semester: this.state.semester
    };

    this.props.createProfile(profileData, this.props.history);
    
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
 
  render() {
    const { errors } = this.state;    

    
    // Select options for degree
    const options = [
      { label: '* Select Degree Type', value: 0 },
      { label: 'Undergraduate', value: 'Undergraduate' },
      { label: 'Postgraduate ', value: 'Postgraduate ' }
    ];
    // Select options for type
    const options2 = [
      { label: '* Select your Field', value: 0 },
      { label: 'Computer Science', value: 'Computer Science' },
      { label: 'Information Systems', value: 'Information Systems ' }
    ];

     // Select options for type
     const options3 = [
      { label: '*Current Semester', value: 0 },
      { label: 'First semester', value: '1' },
      { label: 'Second semester', value: '2 ' },
      { label: 'Third semester', value: '3 ' },
      { label: 'Fourth semester', value: '4 ' },
      { label: 'Fifth semester', value: '5 ' },
      { label: 'Sixth semester', value: '6 ' },
      { label: 'Seventh semester', value: '7 ' },
      { label: 'eighth semester', value: '8 ' }
    ];



    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Index Number"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  
                />
               
                <TextFieldGroup
                  placeholder="Name with Initials"
                  name="namewithinit"
                  value={this.state.namewithinit}
                  onChange={this.onChange}
                  error={errors.namewithinit}
                  
                />
                <TextFieldGroup
                  placeholder="Full Name"
                  name="fullname"
                  value={this.state.fullname}
                  onChange={this.onChange}
                  error={errors.fullname}
                  
                />
                <TextFieldGroup
                  placeholder="Contact Number"
                  name="contactno"
                  value={this.state.contactno}
                  onChange={this.onChange}
                  error={errors.contactno}
                  
                />
                 <SelectListGroup
                  placeholder="Degree Type"
                  name="degreetype"
                  value={this.state.degreetype}
                  onChange={this.onChange}
                  options={options}
                   error={errors.degreetype}
                  
                />
                   <SelectListGroup
                  placeholder="Field"
                  name="field"
                  value={this.state.field}
                  onChange={this.onChange}
                  options={options2}
                  error={errors.field}
                  
                />
      
                   <SelectListGroup
                  placeholder="semester"
                  name="semester"
                  value={this.state.semester}
                  onChange={this.onChange}
                  options={options3}
                  error={errors.semester}
                  
                />          
                               
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
 