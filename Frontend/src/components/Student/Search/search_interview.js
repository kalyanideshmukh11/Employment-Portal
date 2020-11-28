import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import Modal from 'react-modal';
import Navbar from '../Navbar/navbar_student';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { getAllJobs } from '../../../store/actions/companyJobsAction';
import backendServer from '../../../webConfig';
import axios from 'axios';

class SearchInterview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // showModal: false,
      searchResults: '',
    };
    this.searchResults();
    // this.handleOpenModal = this.handleOpenModal.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  searchResults = () => {
    var searchType = 'Interviews';
    var searchKeyword = 'mic';
    const data = {
      company_name: searchKeyword,
    };
    axios
      .post(`${backendServer}company/search/interview`, data)
      .then((response) => {
        console.log(response.data);
        this.setState({
          searchResults: response.data,
        });
        // console.log('Search results : ', this.state.searchResults);
        // if (response.status === 200) {
        //   alert('Interview added');
        // }
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
      });
  };
  // componentDidMount() {
  //   // const args = localStorage.getItem('name');
  //   this.props.getAllJobs(args);
  // }

  // handleOpenModal(arg) {
  //   let jobdata = this.props.jobs.filter((job) => job._id === arg);
  //   this.setState({
  //     showModal: true,
  //     jobdata: jobdata[0],
  //     job_id: arg,
  //   });
  // }

  // handleCloseModal() {
  //   this.setState({ showModal: false });
  // }

  render() {
    let renderOutput = [];
    if (this.state.searchResults && this.state.searchResults.length > 0) {
      console.log('search results:', this.state.searchResults);
      for (var i = 0; i < this.state.searchResults.length; i++) {
        // const job_id = this.props.jobs[i]._id;
        renderOutput.push(
          <div className='container' style={{ paddingRight: '40%' }}>
            <Card border-width='10px' style={{ width: '100%', color: 'black' }}>
              <div class='d-flex'>
                <div class='mx-auto pull-left'>
                  <div className='col-md-12'>
                    <div class='company-icon'>
                      <span class='input-group-text'>
                        <i class='far fa-building'></i>
                      </span>
                    </div>
                  </div>
                  <div class='mx-auto pull-right'>
                    <Card.Title>
                      <h4 className='ml-3' style={{ color: 'green' }}>
                        {this.state.searchResults[i].companyName}
                      </h4>
                      {/* <a href='#' onClick={() => this.handleOpenModal(job_id)}> */}
                      Job Title - {this.state.searchResults[i].title}
                      {/* </a> */}
                    </Card.Title>
                    <Card.Body>
                      <h6>
                        <a href='#' style={{ color: 'black' }}>
                          No of Applicants
                        </a>{' '}
                        - 2
                      </h6>
                      {this.state.searchResults[i].industry && (
                        <h6>
                          Industry - {this.state.searchResults[i].industry}
                        </h6>
                      )}
                      {this.state.searchResults[i].posted_date && (
                        <h6>
                          Posted date -{' '}
                          {this.state.searchResults[i].posted_date}
                        </h6>
                      )}
                      <h6>
                        {this.state.searchResults[i].city && (
                          <span>{this.state.searchResults[i].city},</span>
                        )}
                        {this.state.searchResults[i].state && (
                          <span> {this.state.searchResults[i].state}</span>
                        )}
                      </h6>
                    </Card.Body>

                    <hr />
                  </div>
                </div>
              </div>
            </Card>
          </div>
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
                className='pl-3'
              >
                Search Results
              </h3>
              {/* <span style={{ float: 'right' }}>
                <Link
                  to={{
                    pathname: `/company/addjob`,
                  }}
                >
                  <Button variant='success'>Add New Job</Button>
                </Link>
              </span> */}
            </div>
            {renderOutput}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchInterview;
