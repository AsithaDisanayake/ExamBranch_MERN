import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { createSubject } from '../../actions/subjectActions';
import TextFieldGroup from '../common/TextFieldGroup';
// import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

class AddSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
        subjectcode: '',
        subjectname: '',
        degreetype: '',
        stream: '',
        semester: '',
      
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    
    const { user } = this.props.auth;

    const newSubject = {
      subjectcode: this.state.subjectcode,
      subjectname: this.state.subjectname,
      degreetype: this.state.degreetype,
      stream: this.state.stream,
      semester: this.state.semester,
      
    };

    // this.props.addPost(newPost);
    // this.setState({ text: '' });

    this.props.createSubject(newSubject);
    this.setState({ subjectcode: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

     // Select options for degree
     const options = [
        { label: 'degree Type', value: 0 },
        { label: 'Undergraduate', value: 'Undergraduate' },
        { label: 'Postgraduate ', value: 'Postgraduate ' }
      ];
      // Select options for type
      const options2 = [
        { label: 'field', value: 0 },
        { label: 'Computer Science', value: 'Computer Science' },
        { label: 'Information Systems', value: 'Information Systems ' }
      ];
  
       // Select options for type
       const options3 = [
        { label: 'current Semester', value: 0 },
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
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Create Course</div>
          <div className="card-body">
          <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                  placeholder="subject code"
                  name="subjectcode"
                  value={this.state.subjectcode}
                  onChange={this.onChange}                
                error={errors.subjectcode}   
                  
                />
               
                <TextFieldGroup
                  placeholder="subject Name"
                  name="subjectname"
                  value={this.state.subjectname}
                  onChange={this.onChange}
                  error={errors.subjectname}
                   
                />
               
                 <SelectListGroup
                  placeholder="degree Type"
                  name="degreetype"
                  value={this.state.degreetype}
                  onChange={this.onChange}
                  options={options}
                  error={errors.degreetype}
                  
                />
                   <SelectListGroup
                  placeholder="Stream"
                  name="stream"
                  value={this.state.stream}
                  onChange={this.onChange}
                  options={options2}
                  error={errors.stream}
                  
                />
      
                   <SelectListGroup
                  placeholder="Semester"
                  name="semester"
                  value={this.state.semester}
                  onChange={this.onChange}
                  options={options3}
                  error={errors.semester}
                  
                />          
                               
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info float-right"
                />
              </form>
          </div>
        </div>
      </div>
    );
  }
}

AddSubject.propTypes = {
  createSubject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { createSubject })(AddSubject);
