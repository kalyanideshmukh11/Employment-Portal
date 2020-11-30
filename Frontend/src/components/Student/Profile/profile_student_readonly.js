import React, { Component } from 'react';
import Navbar from '../../Student/Navbar/navbar_company';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faEnvelope,
  faPhone,
  faGlobeAmericas,
  faMapMarked,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Image } from 'react-bootstrap';
import profilePicture from '../images/studentPlaceholder.png';
import BasicProfileModal from './basicProfile_modalForm_student';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudentProfile } from '../../../store/actions/studentProfileAction';
import ExperienceData from './experienceData';
import SkillsData from './skillsData';
import EducationData from './educationData';

class StudentProfileRO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      experienceShow: false,
      skillsShow: false,
      educationShow: false,
      studentBasic_data: {},
    };
  }

  componentWillMount = () => {
    localStorage.setItem(
      'sql_student_id',
      this.props.location.state.student_id,
    );
    this.props.getStudentProfile();
  };

  render() {
    let details = this.props.studentProfile_data;
    let job_title,
      location,
      phone_number,
      website,
      about_me,
      experience,
      skills,
      education;

    if (details.job_title) {
      job_title = (
        <div style={{ marginTop: '1.75mm' }}>
          <FontAwesomeIcon icon={faBriefcase} />
          <span style={{ marginLeft: '1mm' }}>{details.job_title}</span>
        </div>
      );
    }

    if (details.city) {
      location = (
        <div style={{ marginTop: '1.75mm' }}>
          <FontAwesomeIcon icon={faMapMarked} />
          <span style={{ marginLeft: '1mm' }}>{details.city}</span>
        </div>
      );
    }

    if (details.phone_number) {
      phone_number = (
        <div style={{ marginTop: '1.75mm' }}>
          <FontAwesomeIcon icon={faPhone} />
          <span style={{ marginLeft: '1mm' }}>{details.phone_number}</span>
        </div>
      );
    }

    if (details.website) {
      website = (
        <div style={{ marginTop: '1.75mm' }}>
          <FontAwesomeIcon icon={faGlobeAmericas} />
          <span style={{ marginLeft: '1mm' }}>{details.website}</span>
        </div>
      );
    }
    if (details.aboutMe) {
      about_me = (
        <div
          class='col-10'
          style={{ padding: '0px 20px 0px 0px', textAlign: 'justify' }}>
          {details.aboutMe}
        </div>
      );
    }
    if (details.experience) {
      experience = <ExperienceData />;
    }

    if (details.skills) {
      skills = <SkillsData />;
    }

    if (details.education) {
      education = <EducationData />;
    }

    return (
      <React.Fragment>
        <Navbar />
        <br />
        <br />

        <div className='row'>
          <div
            class='col-4'
            style={{ paddingLeft: '2cm', paddingRight: '1cm' }}>
            <Card>
              <Card.Body>
                <Image
                  src={profilePicture}
                  style={{ width: '1.5cm' }}
                  roundedCircle
                />
                <br />
                <br />
                <Card.Title>
                  <span
                    style={{
                      textTransform: 'uppercase',
                      fontWeight: 'bolder',
                      fontFamily: 'helvetica',
                    }}>
                    {' '}
                    {details.first_name} {details.last_name}{' '}
                  </span>
                </Card.Title>

                <hr />
              </Card.Body>
            </Card>
          </div>
          <div class='col-8' style={{ borderLeft: '1px solid #e6e6e6' }}>
            <div class='row'>
              <div class='col'>
                <h4
                  style={{
                    fontFamily: 'helvetica',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}>
                  {' '}
                  {details.first_name} {details.last_name}{' '}
                </h4>
              </div>
              <div class='col'>
                <BasicProfileModal
                  show={this.state.showModal}
                  onHide={this.handleClose}
                />
              </div>
            </div>

            <div class='row'>
              <div class='col col-md-4'>{job_title}</div>
              <div class='col col-md-4'>
                <div style={{ marginTop: '1.75mm' }}>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span style={{ marginLeft: '1mm' }}>{details.email}</span>
                </div>
              </div>
              <div class='col col-md-4'>{phone_number}</div>
            </div>

            <div class='row'>
              <div class='col col-md-4'>{location}</div>
              <div class='col col-md-4'>{website}</div>
            </div>
            <br />
            <br />
            <h4 style={{ fontFamily: 'helvetica', fontWeight: 'bold' }}>
              {' '}
              About Me
              <Button
                variant='link'
                style={{ textDecoration: 'none' }}
                onClick={this.handleAboutMeModalShow}></Button>
            </h4>
            <hr />
            {about_me}

            <br />
            <br />
            <h4 style={{ fontFamily: 'helvetica', fontWeight: 'bold' }}>
              {' '}
              Experience
              <Button
                variant='link'
                style={{ textDecoration: 'none' }}
                onClick={this.handleExperienceModalShow}></Button>
            </h4>
            <hr />
            {experience}

            <br />
            <br />
            <h4 style={{ fontFamily: 'helvetica', fontWeight: 'bold' }}>
              {' '}
              Skills
              <Button
                variant='link'
                style={{ textDecoration: 'none' }}
                onClick={this.handleSkillsModalShow}></Button>
            </h4>
            <hr />
            {skills}

            <br />
            <br />
            <h4 style={{ fontFamily: 'helvetica', fontWeight: 'bold' }}>
              {' '}
              Education
              <Button
                variant='link'
                style={{ textDecoration: 'none' }}
                onClick={this.handleEducationModalShow}></Button>
            </h4>
            <hr />
            {education}
            <br />
            <br />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

StudentProfileRO.propTypes = {
  getStudentProfile: PropTypes.func.isRequired,
  studentProfile_data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  studentProfile_data: state.studentProfile.payload,
});

export default connect(mapStateToProps, { getStudentProfile })(
  StudentProfileRO,
);
