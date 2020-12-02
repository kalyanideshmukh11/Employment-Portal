import React, { Component } from 'react';
import StudentNavbar from '../Navbar/navbar_student';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { Button, Card } from 'react-bootstrap';
import JobApplicationModal from './JobApplicationModal';

class JobDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleApplicationClose = () => this.setState({ applicationShow: false });
  handleApplicationModalShow = () => this.setState({ applicationShow: true });

  render() {
    console.log('this.props.location.state');
    console.log(this.props.location.state);
    return (
      <div>
        <StudentNavbar />
        <br />
        <br />

        <div style={{ margin: 'auto', width: '50%' }}>
          <div>
            <Card style={{ width: '22cm' }}>
              <Card.Img variant='top' style={{ width: '15rem' }} src='' />
              <Card.Title
                style={{
                  padding: '30px 20px 0px 20px',
                  fontWeight: 'bolder',
                  fontSize: '25px',
                }}
              >
                {this.props.location.state.companyName}
              </Card.Title>
              <div className='d-flex flex-row'>
                <div style={{ width: '22cm' }}>
                  <Card.Body>
                    <Card.Text>{this.props.location.state.industry}</Card.Text>
                    <br />
                    <Card.Text>
                      {' '}
                      {this.props.location.state.city} |{' '}
                      {this.props.location.state.country}
                    </Card.Text>
                  </Card.Body>
                </div>
                <div style={{ float: 'right', padding: '40px 100px 0 0' }}>
                  <Button
                    variant='primary'
                    onClick={this.handleApplicationModalShow}
                  >
                    <div className='d-flex flex-row'>
                      <FontAwesomeIcon
                        icon={faShareSquare}
                        style={{ verticalAlign: 'middle' }}
                      />
                      <span>Apply</span>
                    </div>
                  </Button>
                  <JobApplicationModal
                    applicationShow={this.state.applicationShow}
                    applicationOnHide={this.handleApplicationClose}
                    jobDetails={{ _id: '5fbc4a1bbb7db6419013c33e' }}
                  />
                </div>
              </div>
            </Card>
            <Card style={{ width: '22cm' }}>
              <Card.Title
                style={{
                  padding: '30px 20px 0px 20px',
                  fontWeight: 'bolder',
                  fontSize: '25px',
                }}
              >
                {this.props.location.state.title}
              </Card.Title>
              <Card.Body>
                <Card.Text style={{ fontWeight: 'bold', color: '#49504C' }}>
                  Job Description
                </Card.Text>
                <Card.Text>{this.props.location.state.description}</Card.Text>
                <br />
                <Card.Text style={{ fontWeight: 'bold', color: '#49504C' }}>
                  Responsibilities
                </Card.Text>
                <Card.Text>
                  {this.props.location.state.responsibilities}
                </Card.Text>
                <br />
                <Card.Text style={{ fontWeight: 'bold', color: '#49504C' }}>
                  Qualifications
                </Card.Text>
                <Card.Text>{this.props.location.state.qualification}</Card.Text>
              </Card.Body>
            </Card>
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default JobDetails;
