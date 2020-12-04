import React, { Component } from 'react';
import StudentNavbar from '../Navbar/navbar_student';
import { Button, InputGroup, FormControl, Card } from 'react-bootstrap';
import backendServer from '../../../webConfig';
import axios from 'axios';
import { Multiselect } from 'multiselect-react-dropdown';
import JobDetails from './JobDetails';

class JobHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
    this.onPostDateFilter = this.onPostDateFilter.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onJobTypeFilter = this.onJobTypeFilter.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onFocus = (e) => {
    console.log('focus');
    e.target.value = '';
    console.log(e);
  };

  onChange = (e) => {
    console.log(e);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onClick = (e, job) => {
    this.setState({
      curJob: job,
    });
  };

  componentWillMount = () => {
    this.setState({
      job_type: [
        { value: 'All Job Types', key: 1 },
        { value: 'Full-time', key: 2 },
        { value: 'Contract', key: 3 },
        { value: 'Internship', key: 4 },
        { value: 'Temporary', key: 5 },
      ],
      posting_filter: [{ value: 'All' }, { value: 'Most Recent' }],
      curJob: null,
      minSalary: '1',
      maxSalary: '9999999',
      location_filter: '',
    });
    this.getJobs(this.props);
  };

  onFilter() {
    var filteredList = this.state.allJobs;
    console.log('here');
    console.log(this.state);
    var list = [];
    if (filteredList && filteredList.length > 0) {
      if (this.state.location_filter !== '') {
        let location_filter = this.state.location_filter.toLowerCase();
        list = filteredList.filter((job) => {
          if (
            job.address &&
            job.address.toLowerCase().includes(location_filter)
          ) {
            return true;
          } else if (
            job.state &&
            job.state.toLowerCase().includes(location_filter)
          ) {
            return true;
          } else if (
            job.country &&
            job.country.toLowerCase().includes(location_filter)
          ) {
            return true;
          } else if (
            job.city &&
            job.city.toLowerCase().includes(location_filter)
          ) {
            return true;
          } else {
            return false;
          }
        });
      } else {
        list = filteredList;
      }
      console.log('after location: ', list.length);
      if (
        this.state.minSalary !== '1' &&
        this.state.maxSalary !== '9999999' &&
        this.state.minSalary !== '' &&
        this.state.maxSalary !== ''
      ) {
        list = list.filter((job) => {
          console.log('job');
          console.log(job);
          console.log(job.fromSalary);
          console.log(job.toSalary);
          console.log(this.state);
          if (job.fromSalary && job.toSalary) {
            return (
              parseInt(job.fromSalary) >= parseInt(this.state.minSalary) &&
              parseInt(job.toSalary) <= parseInt(this.state.maxSalary)
            );
          } else {
            return false;
          }
        });
      }
    }
    console.log('after all filter:', list.length);
    this.setState({
      filterJobs: list,
      curJob: list[0],
      minSalary: '1',
      maxSalary: '9999999',
      location_filter: '',
    });
    if (list.length === 0) {
      this.setState({ noRecords: 1, curJob: null });
    }
  }

  getJobs(props) {
    let axiosLink = `${backendServer}student/job/all`;
    console.log('testing');
    console.log(props.location.state);
    if (
      props.location &&
      props.location.state &&
      props.location.state.search_param !== ''
    ) {
      axiosLink = `${backendServer}student/job/search/${props.location.state.search_param}`;
    }
    console.log(axiosLink);
    axios
      .get(axiosLink)
      .then((response) => {
        if (response.data) {
          this.setState({
            allJobs: response.data,
            filterJobs: response.data,
            curJob: response.data[0],
          });

          this.forceUpdate();
        }
      })
      .catch((error) => {
        console.log('Error');
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProp) {
    console.log('Received: ', nextProp);
    this.setState({
      minSalary: '1',
      maxSalary: '9999999',
      location_filter: '',
      filterJobs: this.state.allJobs,
    });
    this.getJobs(nextProp);
  }

  onPostDateFilter = (e, x) => {
    // sort
    console.log('onPostDateFilter');
    console.log(x.value);
    this.setState({
      selected_posting_filter: [{ value: x.value }],
    });
    let filteredList = this.state.filterJobs;
    if (x.value !== 'All' && filteredList) {
      filteredList.sort(function (a, b) {
        return new Date(b.posted_date) - new Date(a.posted_date);
      });
      this.setState({
        filterJobs: filteredList,
      });
    }
  };

  onJobTypeFilter = (e, x) => {
    // sort
    console.log('onJobTypeFilter');
    console.log(x.value);
    /*this.setState({
      selected_posting_filter: [{ value: x.value }],
    });*/
    let filteredList = this.state.filterJobs;
    if (x.value === 'All Job Types') {
      this.setState({
        filterJobs: this.state.allJobs,
      });
    } else if (filteredList) {
      let list = [];
      list = filteredList.filter((job) => {
        console.log('job');
        console.log(job);
        console.log(this.state);
        if (job.jobType) {
          return job.jobType === x.value;
          //job.jobType.includes(location_filter)
        } else {
          return false;
        }
      });
      this.setState({
        filterJobs: list,
      });
    }
  };

  render() {
    let jobTag = null;
    let curJob = null;

    if (this.state && this.state.curJob) {
      curJob = this.state.curJob;
    }
    if (
      this.state &&
      this.state.filterJobs &&
      this.state.filterJobs.length > 0
    ) {
      jobTag = this.state.filterJobs.map((job) => {
        return (
          <Card border-width='10px' style={{ width: '100%', color: 'black' }}>
            <Button
              onClick={(e) => this.onClick(e, job)}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
              }}
            >
              <Card.Body>
                <div class='d-flex'>
                  <div class='pull-left'>
                    <Card.Img
                      variant='top'
                      class='building-icon'
                      src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAACmpqZFRUVCQkLa2totLS3y8vJlZWUfHx9xcXHIyMgpKSnx8fE/Pz+Pj49VVVUJCQnCwsLq6uoUFBSurq7R0dH4+PhRUVFfX1+VlZWBgYEyMjKIiIhra2t5eXmgoKAZGRm2trbZ2dk3Nzfj4+M48jMoAAAEBklEQVR4nO3d6XqiMBSAYW1r3RcUt45t1er93+JMRwkawulRJI34fT95Auk7TF0wxVqNiIiIiIh+ve2Tp8a/JRzUPbX8LeGzL2ELIUKEPwijqgsHjfKa9UIQvpQ4w/y16sImwpJDWDyEZZcRzvcTof08GSeN+ld6wOCE3XokVH9Kxo2kcfVe3xwwQKHYiVCqjdBfCBHer7D1ZvXpFMZDe9zLvQi39sCGU9jLHLBzL8KpPXDmFLbn9jiE3kNoQpiE0HsITQiTEHoPoQlhEkLvqd89fbmFmQPejfC9Oz6r++QWju1xoxzhYnx13VKEeV19FaNAu8oLnxEiRHjW+nzH3AIW9uVHbvOx2Uz7AH8UjmZXtCtDePOKPOM/V174glARwuIhlEKoKStsipl3vHN53MnxMkL1ruUIu3FPaGPe+7fa0rhd+nNmhduNtGt88mqhHKH8Ckr5unQjvcefylOc/N1CwELxKgZChAh1wsWnVcspjDr2uJVauLR3HXkVXr3a5FMtnNm7dr0Ky7zmfRRmLoOOEV4VQhPCJIQ1hAgvDaEJYRLCGkKEl1Z0tcn9Ct/21p9kb93CL2vYvqUWTu1dn7wK86rOVQyECBGGK1wn4xbyuICFE/l2T41k3FgcNk2fJ7PChjzFvmThzQvvE9Jbh1AKoSaExUMohVBTRjhbDYRW5p1xZyeNW4irTcQpXkNZbSK/amO1CUKECBXC3Whx1ujZKYwWVqO2Wjiwpxh4FbLa5P6vCCNEiBDhIYSaEJoQJiGsIUR4aY8rrP5qk7V9c+exW2jfObr/oRZu7SmmXoWO+zu7hPXYGhVHamHeFFynQYjw4YXrZJz8uUUUsHD/PhR6N5cAp9Kw4Zu02mQmT8FqkwtDWDyEUgg1ISweQqlyhOvFSCp5Pu63llJDczyHcChOsUxXqpQj/CO/pkqW0E7kYSnIIWzJ+6av+H5XGJcljBEiRHgUvq6sNk5hvLPHqYWRvecq9imMJvbId6ewYw9rtrXC18y11g+v5/BaYV8vbNr7IrwqhGkIjyH8DqHZgFATwjSExxB+h9BsQKjpcYVRw7pj8/zPzYUT+z7TfoWZN+DtWwvzpgjsOk0BYV4IESL0IVzKU5QtnHbEkufJIsK1OMNn2Z89KSsiVIdQU1nCD7OhqkLOoa6QhdU/hwh1IdTEI01unEOzoarC6p9DhLpCFvJ7qAuhJoS5PbyQRxpdIQs5h7oQauJ/aW6Pew6b9jmc+xfOT74X5Otwr8JB4+K6m8MPbn+XyewgXKYbetaGCzr+dKdfhJJZHO5ocrw7w2mOTT+Ut0fu9suncB0ru8LeJbx8qoBSCa/41wwm3TlEGHL8Hv6vKX9FSOBlFsMREREREZGX/gIAA/VAN9vp3wAAAABJRU5ErkJggg=='
                    ></Card.Img>
                  </div>
                  <div class='col-md-8'>
                    <Card.Title>
                      {/*`/student/interview/list/${value.id}`*/}
                      <div
                        className='ml-3'
                        style={{ color: '#505863', font: '12px' }}
                      >
                        {job.companyName}
                      </div>
                    </Card.Title>

                    <div
                      className='ml-3'
                      style={{
                        color: '#505863',
                        font: '16px',
                        fontWeight: 'bold',
                      }}
                    >
                      {job.title}
                    </div>
                    <div className='d-flex flex-row'>
                      <div className='ml-3' style={{ color: '#7f7f7f' }}>
                        {job.city}, {job.state}
                      </div>
                      <div className='ml-3' style={{ color: '#7f7f7f' }}>
                        {job.posted_date}
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Button>
          </Card>
        );
      });
    }
    return (
      <div>
        <StudentNavbar />
        <br />
        <br />

        <div
          className='d-flex flex-row'
          style={{ width: '80%', marginLeft: '90px', marginBottom: '20px' }}
        >
          <Multiselect
            options={this.state.posting_filter}
            displayValue='value'
            singleSelect
            name='posting_date'
            onSelect={this.onPostDateFilter}
            style={{
              multiselectContainer: { width: '10.5cm' },
            }}
            selectedValues={this.state.selected_posting_filter}
          />
          &nbsp;&nbsp;
          <Multiselect
            required={true}
            options={this.state.job_type}
            displayValue='value'
            singleSelect
            name='job_type'
            onSelect={this.onJobTypeFilter}
            style={{
              multiselectContainer: { width: '100%', fontSize: '16px' },
            }}
          />
          &nbsp;&nbsp;
          <InputGroup className='mb-3'>
            <FormControl
              placeholder='Min Salary'
              aria-label='min_salary'
              aria-describedby='basic-addon1'
              name='minSalary'
              onChange={this.onChange}
              onFocus={this.onFocus}
              type='number'
            />
          </InputGroup>
          &nbsp;&nbsp;
          <div>-</div>
          &nbsp;&nbsp;
          <InputGroup className='mb-3'>
            <FormControl
              placeholder='Max Salary'
              aria-label='max_salary'
              aria-describedby='basic-addon1'
              name='maxSalary'
              onChange={this.onChange}
              type='number'
              onFocus={this.onFocus}
            />
          </InputGroup>
          &nbsp;&nbsp;
          <InputGroup>
            <FormControl
              placeholder='Location'
              aria-label='location'
              aria-describedby='basic-addon1'
              name='location_filter'
              onChange={this.onChange}
              onFocus={this.onFocus}
            />
          </InputGroup>
          &nbsp;&nbsp;
          <InputGroup>
            <Button onClick={this.onFilter} variant='success'>
              Filter
            </Button>
          </InputGroup>
        </div>

        <div className='row'>
          <div
            class='col-5'
            style={{
              paddingLeft: '2cm',
              overflowY: 'scroll',
              overflowX: 'hidden',
              position: 'relative',
              height: '730px',
            }}
          >
            {jobTag}
            {/*<div>
              <ListGroup variant='flush'>
                <ListGroup.Item
                  action
                  variant='light'
                  active={this.state.profileState}
                  onClick={() => {
                    localStorage.setItem('active-list', 'profile');
                  }}
                  style={{ color: 'black' }}
                  href='/student/profile'
                >
                  Profile
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  variant='light'
                  active={this.state.resumeState}
                  onClick={() => {
                    localStorage.setItem('active-list', 'resume');
                  }}
                  style={{ color: 'black' }}
                  href='/student/resume'
                >
                  Resume
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  variant='light'
                  active={this.state.jobPreferenceState}
                  onClick={() => {
                    localStorage.setItem('active-list', 'jobPreference');
                  }}
                  style={{ color: 'black' }}
                  href='/student/jobPreference'
                >
                  Job Preference
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  variant='light'
                  active={this.state.demographicsState}
                  onClick={() => {
                    localStorage.setItem('active-list', 'demographics');
                  }}
                  style={{ color: 'black' }}
                  href='/student/demographics'
                >
                  Demographics
                </ListGroup.Item>
              </ListGroup>
            </div>*/}
          </div>
          <div
            class='col-7'
            style={{
              borderLeft: '1px solid #e6e6e6',
              overflowY: 'scroll',
              overflowX: 'hidden',
              position: 'relative',
              height: '730px',
            }}
          >
            <JobDetails info={curJob} />
            {/*<div class='row'>
              <div class='col'>
                <h4
                  style={{
                    fontFamily: 'helvetica',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  {' '}
                  A B
                </h4>
              </div>
              <div class='col'>
                <Button
                  style={{ float: 'right', marginRight: '1mm' }}
                  variant='link'
                  onClick={this.handleShow}
                >
                  <FontAwesomeIcon
                    style={{ marginTop: '', color: 'gray' }}
                    icon={faPen}
                    size='sm'
                  />
                </Button>
              </div>
            </div>
            <div class='row'>
              <div class='col col-md-4'>job_title</div>
              <div class='col col-md-4'>
                <div style={{ marginTop: '1.75mm' }}>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span style={{ marginLeft: '1mm' }}>a@b.com</span>
                </div>
              </div>
              <div class='col col-md-4'>phone_number</div>
            </div>
            <div class='row'>
              <div class='col col-md-4'>location</div>
              <div class='col col-md-4'>website</div>
            </div>
            <br />
            <br />
            <h4 style={{ fontFamily: 'helvetica', fontWeight: 'bold' }}>
              {' '}
              About Me
              <Button
                variant='link'
                style={{ textDecoration: 'none' }}
                onClick={this.handleAboutMeModalShow}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
              </Button>
            </h4>
            <hr />
            about_me
            <br />
            <br />
            <h4 style={{ fontFamily: 'helvetica', fontWeight: 'bold' }}>
              {' '}
              Experience
              <Button
                variant='link'
                style={{ textDecoration: 'none' }}
                onClick={this.handleExperienceModalShow}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
              </Button>
            </h4>
            <hr />
            experience
            <br />
            <br />
            <h4 style={{ fontFamily: 'helvetica', fontWeight: 'bold' }}>
              {' '}
              Skills
              <Button
                variant='link'
                style={{ textDecoration: 'none' }}
                onClick={this.handleSkillsModalShow}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
              </Button>
            </h4>
            <hr />
            skills
            <br />
            <br />
            <h4 style={{ fontFamily: 'helvetica', fontWeight: 'bold' }}>
              {' '}
              Education
              <Button
                variant='link'
                style={{ textDecoration: 'none' }}
                onClick={this.handleEducationModalShow}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
              </Button>
            </h4>
            <hr />
            education
            <br />
                <br />*/}
          </div>
        </div>
      </div>
    );
  }
}

export default JobHome;
