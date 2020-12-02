import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../../Student/Navbar/navbar_student';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveJobs } from '../../../store/actions/studentJobsAction';
import axios from 'axios';
import backendServer from '../../../webConfig';

class JobsTab extends Component {
  constructor(props) {
    super(props);
    this.routeParam = props.match.params.companyName;
    this.state = {
        showModal: false,
      };
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    axios.get(`${backendServer}glassdoor/jobs/${this.routeParam}/fetchjobs/`)
          .then(res => {
              if(res.status === 200){
                  if(res.data){
                      this.props.saveJobs(res.data)
                      console.log(this.props.jobs)
                  }
              }
          })
  };
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
                  {this.props.jobs[i].title}
                </a>
                <Card.Body>
                    <h6>{this.props.jobs[i].companyName}- {this.props.jobs[i].city},{this.props.jobs[i].state}</h6>
                    <div>
                    {this.props.jobs[i].posted_date}
                    </div>
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

JobsTab.propTypes = {
  saveJobs: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobs,
});

const mapDispatchToProps = (dispatch) => {
    return {
      saveJobs: (data) => dispatch(saveJobs(data)),
     
    }
  }
export default connect(mapStateToProps,mapDispatchToProps )(JobsTab);
