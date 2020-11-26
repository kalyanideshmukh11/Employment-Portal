import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Navbar from '../../Student/Navbar/navbar_student';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllJobs } from '../../../store/actions/companyJobsAction';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    const args = localStorage.getItem('name');
    this.props.getAllJobs(args);
  }

  handleOpenModal(arg) {
    let jobdata = this.props.jobs.filter((job) => job._id === arg);
    this.setState({
      showModal: true,
      jobdata: jobdata[0],
      job_id: arg,
    });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    let renderOutput = [];
    if (this.props && this.props.jobs && this.props.jobs.length > 0) {
      for (var i = 0; i < this.props.jobs.length; i++) {
        const job_id = this.props.jobs[i]._id;
        renderOutput.push(
          <div className='container' style={{ paddingRight: '60%' }}>
            <div className='col-md-12'>
              <Card.Title>
                <a href='#' onClick={() => this.handleOpenModal(job_id)}>
                  Job Title - {this.props.jobs[i].title}
                </a>
                <Modal
                  isOpen={this.state.showModal}
                  contentLabel='Minimal Modal Example'>
                  <h4 className='ml-3' style={{ color: ' #d0312d' }}>
                    Job Details
                  </h4>
                  {this.state.jobdata && (
                    <Card.Title style={{ marginLeft: '15px' }}>
                      {this.state.jobdata.title}
                      <span>2</span>
                    </Card.Title>
                  )}
                  <Card.Body>
                    {this.state.jobdata && (
                      <React.Fragment>
                        <p>
                          <strong>Company Name</strong> -{' '}
                          {this.state.jobdata.companyName}
                        </p>
                        <p>
                          <strong>Description</strong> -{' '}
                          {this.state.jobdata.description}
                        </p>
                        <p>
                          <strong>Responsibilities</strong> -
                          {this.state.jobdata.responsibilities}
                        </p>
                        <p>
                          <strong>Qualification</strong> -{' '}
                          {this.state.jobdata.qualification}
                        </p>
                        {this.state.jobdata.industry && (
                          <p>
                            <strong>Industry</strong> -{' '}
                            {this.state.jobdata.industry}
                          </p>
                        )}
                        {this.state.jobdata.country && (
                          <p>
                            <strong>Country</strong> -{' '}
                            {this.state.jobdata.country}
                          </p>
                        )}
                        {this.state.jobdata.workType && (
                          <p>
                            <strong>Work Type</strong> -{' '}
                            {this.state.jobdata.workType}
                          </p>
                        )}
                        {this.state.jobdata.address && (
                          <p>
                            <strong>Address</strong> -{' '}
                            {this.state.jobdata.address}
                          </p>
                        )}
                        {this.state.jobdata.city && (
                          <p>
                            <strong>City</strong> - {this.state.jobdata.city}
                          </p>
                        )}
                        {this.state.jobdata.state && (
                          <p>
                            <strong>State</strong> - {this.state.jobdata.state}
                          </p>
                        )}
                        {this.state.jobdata.zipcode && (
                          <p>
                            <strong>Zipcode</strong> -{' '}
                            {this.state.jobdata.zipcode}
                          </p>
                        )}
                        {this.state.jobdata.posted_date && (
                          <p>
                            <strong>Posted Date</strong> -{' '}
                            {this.state.jobdata.posted_date}
                          </p>
                        )}
                      </React.Fragment>
                    )}
                  </Card.Body>
                  <br />
                  <br />
                  <button className='mt-3 ml-3' onClick={this.handleCloseModal}>
                    Close Modal
                  </button>
                </Modal>
                <Card.Body>
                  <h6>
                    <a href='#' style={{ color: 'black' }}>
                      No of Applicants
                    </a>{' '}
                    - 2
                  </h6>
                  {this.props.jobs[i].industry && (
                    <h6>Industry - {this.props.jobs[i].industry}</h6>
                  )}
                  {this.props.jobs[i].posted_date && (
                    <h6>Posted date - {this.props.jobs[i].posted_date}</h6>
                  )}
                  <h6>
                    {this.props.jobs[i].city && (
                      <span>{this.props.jobs[i].city},</span>
                    )}
                    {this.props.jobs[i].state && (
                      <span> {this.props.jobs[i].state}</span>
                    )}
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
                All Jobs
              </h3>
              <span style={{ float: 'right' }}>
                <Link
                  to={{
                    pathname: `/company/addjob`,
                  }}>
                  <Button variant='success'>Add New Job</Button>
                </Link>
              </span>
            </div>
            {renderOutput}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Jobs.propTypes = {
  getAllJobs: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobs,
});

export default connect(mapStateToProps, { getAllJobs })(Jobs);
