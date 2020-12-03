import React, {Component} from 'react';
import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom';

class JobList extends Component {
    constructor(props){
        super(props)
        this.state ={
        }
    }
    render(){
        return(
            <div className='container' style={{ paddingRight: '60%' }}>
            <div className='col-md-12'>
              <Card.Title>
              <Link to={`/student/job/jobdetails`}
                          params={{ data: this.props.company_jobs }}
                        >
                          {this.props.company_jobs.title}
                        </Link>
                <Card.Body>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                    <h6>{this.props.company_jobs.companyName}- {this.props.company_jobs.city},{this.props.company_jobs.state}</h6>
                    </div>
                     <div>
                      <button style={{backgroundColor: "transparent",border: "none",  color: "green", fontSize: "20px"}}> <i class="far fa-heart"></i> </button>
                    </div>
                  </div>
                  <span style={{ float: 'right' }}>
                  <div>
                     <p  style={{ color: "grey", fontSize: "10px"}}> {new Date()- this.props.company_jobs.posted_date} days ago </p>
                    </div>
                  </span>
                </Card.Body>
              </Card.Title>
              <hr />
            </div>
          </div>
        )
    }
}

export default JobList;