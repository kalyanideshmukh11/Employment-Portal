import React, { Component } from 'react';
import Navbar from '../../Student/Navbar/navbar_company';
import { Card, Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getJobApplicantDetails,
  updateApplicantStatus,
} from '../../../store/actions/companyJobsAction';

class ApplicantDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    const args = this.props.location.state.job_id;
    this.props.getJobApplicantDetails(args);
  }

  changeHandler = (e) => {
    const args = {
      _id: e.target.id,
      status: e.target.value,
    };
    this.props.updateApplicantStatus(args);
    if (this.props.status === 'Updated') {
      const args = this.props.location.state.job_id;
      this.props.getJobApplicantDetails(args);
    }
  };

  render() {
    let renderOutput = [];
    let applied_students = this.props.jobs.applied_students;
    console.log(applied_students);
    if (this.props && applied_students && applied_students.length > 0) {
      for (var i = 0; i < applied_students.length; i++) {
        const id = applied_students[i]._id;
        renderOutput.push(
          <div className='container' style={{ paddingRight: '60%' }}>
            <div className='col-md-12'>
              <Card.Title>
                <a href='#'>Applicant Name - Person 1</a>
                <Card.Body>
                  {applied_students[i].resume_file_name && (
                    <h6>Resume - {applied_students[i].resume_file_name}</h6>
                  )}
                  {applied_students[i].cover_file_name && (
                    <h6>
                      Cover Letter - {applied_students[i].cover_file_name}
                    </h6>
                  )}
                  {applied_students[i].application_status && (
                    <h6>
                      Application Status -{' '}
                      {applied_students[i].application_status}
                    </h6>
                  )}
                  <h6>
                    Change Status -{' '}
                    <select
                      id={id}
                      onChange={this.changeHandler}
                      value={this.state.value}>
                      <option value='select'>Select</option>
                      <option value='Submitted'>Submitted</option>
                      <option value='Reviewed'>Reviewed</option>
                      <option value='Initial Screening'>
                        Initial Screening
                      </option>
                      <option value='Interviewing'>Interviewing</option>
                      <option value='Hired'>Hired</option>
                    </select>
                  </h6>
                </Card.Body>
              </Card.Title>
              <hr />
            </div>
          </div>,
        );
      }
    }
    return (
      <React.Fragment>
        <Navbar />
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 mt-5'>
              <h3
                style={{ color: '#028A0F', textAlign: 'center' }}
                className='pl-3'>
                Job Applicants
              </h3>
              <br />
            </div>

            {renderOutput}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ApplicantDetails.propTypes = {
  getJobApplicantDetails: PropTypes.func.isRequired,
  updateApplicantStatus: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobs,
  status: state.jobs.status,
});

export default connect(mapStateToProps, {
  getJobApplicantDetails,
  updateApplicantStatus,
})(ApplicantDetails);
