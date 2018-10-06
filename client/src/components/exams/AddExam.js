import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { createExam } from '../../actions/ExamActions';
import TextFieldGroup from '../common/TextFieldGroup';
// import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

class AddExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
        examname: '',
        examyear: '',
        examsemester: '',
        examstartdate: '',
        examstatus: '',
      
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

    const newExam = {
      examname: this.state.examname,
      examyear: this.state.examyear,
      examsemester: this.state.examsemester,
      examstartdate: this.state.examstartdate,
      examstatus: this.state.examstatus,
      
    };


    this.props.createExam(newExam);
    this.setState({ examname: '' });
    this.setState({ examyear: '' });
    this.setState({ examsemester: '' });
    this.setState({ examstartdate: '' });
    this.setState({ examstatus: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

     
  
       // Select options for semester
       const options= [
        { label: 'semester', value: 0 },
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
          <div className="card-header bg-info text-white">Publish the Exam</div>
          <div className="card-body">
          <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                  placeholder="*exam name"
                  name="examname"
                  value={this.state.examname}
                  onChange={this.onChange}                
                error={errors.examname}   
                  
                />
               
                <TextFieldGroup
                  placeholder="*exam year"
                  name="examyear"
                  value={this.state.examyear}
                  onChange={this.onChange}
                  error={errors.examyear}
                   
                />
               
                 <SelectListGroup
                  placeholder="*semester"
                  name="examsemester"
                  value={this.state.examsemester}
                  onChange={this.onChange}
                  options={options}
                  error={errors.examsemester}
                  
                />
                 <TextFieldGroup
                  placeholder="*start"
                  name="examstartdate"
                  value={this.state.examstartdate}
                  onChange={this.onChange}
                  error={errors.examstartdate}
                   
                />
                  <TextFieldGroup
                  placeholder="status"
                  name="examstatus"
                  value={this.state.examstatus}
                  onChange={this.onChange}
                  error={errors.examstatus}
                   
                />
      
                          
                               
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info  mt-4 float-right"
                />
              </form>
          </div>
        </div>
      </div>
    );
  }
}

AddExam.propTypes = {
  createExam: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { createExam })(AddExam);
