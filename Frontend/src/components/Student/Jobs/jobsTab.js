import React, { Component } from 'react';
import { Button, Card, FormControl, ToastBody } from 'react-bootstrap';
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
    this.state = {
        
        inputValue:'',
        offset: 0,
        job_items: [],
        perPage: 4,
        currentPage: 0,
        loading: true
      };
     // this.jobItems = this.jobItems.bind(this);
      this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    axios.get(`${backendServer}student/job/${this.props.companyName}`)
          .then(res => {
              if(res.status === 200){
                  if(res.data){
                      this.props.saveJobs(res.data)
                      console.log(this.props. student_jobs)
                  }
              }
          })
      
  };
  getJobs=()=> {
    setTimeout(() => {
        axios.get(`${backendServer}student/exploreJobs/${this.state.studentHome_data.state}`, 
        {headers: { Authorization: `${localStorage.getItem("token")}` }
        })
        .then(response => {
            const slice = response.data.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.state.job_items = []
            this.setState({
                job_items: this.state.job_items.concat(slice),
                pageCount: Math.ceil(response.data.length / this.state.perPage),
                loading: false
            });
        })
    }, 800)
}
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    console.log(selectedPage)
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.getJobs()
    });

};
  searchChangeHandler=(e) =>{
    console.log("onchange search", e.target.value)
    this.setState({
      inputValue:e.target.value
    })
  }
  search= (event)=>{
   // event.preventDefault();
    this.props.saveJobs(this.props. student_jobs.filter(job =>{
      console.log("inside search",this.state.inputValue)
      console.log((job.title.toLowerCase().includes(this.state.inputValue.toLowerCase()) || job.city.toLowerCase().includes(this.state.inputValue.toLowerCase())))
      return (job.title.toLowerCase().includes(this.state.inputValue.toLowerCase()) || job.city.toLowerCase().includes(this.state.inputValue.toLowerCase()))
    }))
  }
  render() {
    let renderOutput = [];
    if (this.props && this.props. student_jobs && this.props. student_jobs.length > 0) {
      for (var i = 0; i < this.props. student_jobs.length; i++) {
        const job_id = this.props. student_jobs[i]._id;
        renderOutput.push(
          <div className='container' style={{ paddingRight: '60%' }}>
            <div className='col-md-12'>
              <Card.Title>
              <Link to={`/student/job/jobdetails`}
                          params={{ data: this.props. student_jobs[i] }}
                        >
                          {this.props. student_jobs[i].title}
                        </Link>
                <Card.Body>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                    <h6>{this.props. student_jobs[i].companyName}- {this.props. student_jobs[i].city},{this.props. student_jobs[i].state}</h6>
                    </div>
                     <div>
                      <button style={{backgroundColor: "transparent",border: "none",  color: "green", fontSize: "20px"}}> <i class="far fa-heart"></i> </button>
                    </div>
                  </div>
                  <span style={{ float: 'right' }}>
                  <div>
                     <p  style={{ color: "grey", fontSize: "10px"}}> {new Date()- this.props. student_jobs[i].posted_date} days ago </p>
                    </div>
                  </span>
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
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 mt-5'>
              <h3
                style={{ color: '#028A0F', textAlign: 'left' }}
                className='pl-3'>
                {this.props.companyName} Jobs
              </h3>
              <div className='col-md-12 mt-5' style={{ display: 'flex'}}>
              <input
              type='text'
              placeholder='Search Job Title, or City'
              className='mr-sm-3'
              style={{ width: '8cm' }}
              value={this.state.inputValue}
              onChange={this.searchChangeHandler}
            />
            <Button onClick={this.search} variant='primary'>
              Find Jobs
            </Button>
            </div>
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
  student_jobs: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  student_jobs: state.student_jobs.student_jobs,
});

const mapDispatchToProps = (dispatch) => {
    return {
      saveJobs: (data) => dispatch(saveJobs(data)),
     
    }
  }
export default connect(mapStateToProps,mapDispatchToProps )(JobsTab);
