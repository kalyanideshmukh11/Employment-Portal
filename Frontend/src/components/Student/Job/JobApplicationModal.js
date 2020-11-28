import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';
import backendServer from '../../../webConfig';

class JobApplicationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeOptions: [],
      primaryResume: 'primaryResume.pdf',
      selected_resume: 'primaryResume.pdf',
    };
    this.onClickResume = this.onClickResume.bind(this);
    this.onClickCover = this.onClickCover.bind(this);
    this.applyJob = this.applyJob.bind(this);
  }
  componentDidMount() {
    console.log('Here');
    let resumeTag = [];
    axios.defaults.withCredentials = true;
    axios
      .get(
        `${backendServer}student/profile/${localStorage.getItem(
          'sql_student_id'
        )}`,
        { headers: { Authorization: `${localStorage.getItem('token')}` } }
      )
      .then((response) => {
        this.setState({
          resumeOptions: response.data[0].resumes,
        });
        console.log('STUDENT DETAILS');
        console.log(response.data);

        if (response.data[0].resumes && response.data[0].resumes.length > 0) {
          for (let i = 0; i < response.data[0].resumes.length; i++) {
            if (response.data[0].resumes[i].is_primary) {
              this.setState({
                primaryResume: response.data[0].resumes[i].resume,
              });
            }
            resumeTag.push({ value: response.data[0].resumes[i].resume });
          }

          this.setState({
            resumeOptions: resumeTag,
          });
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          console.log(err.response.data);
        }
      });
  }
  onClickResume = (e) => {
    this.setState({
      selected_resume: e.value,
    });
  };
  onClickCover = (e) => {
    this.setState({
      cover_file: e.target.files[0],
      cover_file_text: e.target.files[0].name,
    });
  };

  applyJob = (e) => {
    e.preventDefault();
    const data = {
      resume_file_name: this.state.selected_resume,
      //cover_file: this.state.cover_file,
      cover_file_name: this.state.cover_file_text,
      sql_student_id: localStorage.getItem('sql_student_id'),
      job_id: this.props.jobDetails._id,
      application_status: 'Submitted',
    };
    /*const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };*/
    axios
      .post(`${backendServer}student/job/apply`, data, {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      })
      .then((response) => {
        this.setState({
          status: response.data,
          server_status: response.status,
        });
      });
  };

  render() {
    let error = {
      message: null,
    };
    let success = {
      message: null,
    };
    if (this.state.status === 'APPLIED') {
      success.message = 'Your application has been submitted';
      setTimeout(function () {
        window.location = '/student/profile';
      }, 1500);
    } else if (this.state.server_status === 500) {
      error.message = 'There was an error.Please try again';
      setTimeout(function () {
        window.location = '/student/profile';
      }, 2000);
    }

    const ModalFormContent = (
      <Modal
        show={this.props.applicationShow}
        onHide={this.props.applicationOnHide}
        backdrop='static'
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Apply to Job</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: '10px 30px 10px 30px' }}>
          <Form>
            <Form.Group>
              <Form.Label>Select Resume</Form.Label>
              <Dropdown
                options={this.state.resumeOptions}
                onChange={this.onClickResume}
                placeholder={this.state.primaryResume}
              />
            </Form.Group>

            <Form.Group>
              <Form.File
                id='exampleFormControlFile1'
                name='cover_file'
                label='Cover Letter'
                accept='.doc,.docx,pdf'
                onChange={this.onClickCover}
              />
            </Form.Group>
          </Form>
          <div>
            {error.message && (
              <div
                style={{
                  width: '80%',
                  margin: '0 auto',
                  marginBottom: '5mm',
                  textAlign: 'center',
                  padding: '10px 10px 10px 10px',
                }}
                className='alert alert-danger'
              >
                {error.message}
              </div>
            )}
            {success.message && (
              <div
                style={{
                  width: '80%',
                  margin: '0 auto',
                  marginBottom: '5mm',
                  textAlign: 'center',
                  padding: '10px 10px 10px 10px',
                }}
                className='alert alert-success'
              >
                {success.message}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.applyJob} variant='success'>
            Apply to Job
          </Button>
        </Modal.Footer>
      </Modal>
    );
    return <div>{ModalFormContent}</div>;
  }
}

export default JobApplicationModal;
