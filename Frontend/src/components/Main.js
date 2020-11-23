import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import StudentHome from './Student/LandingPage/home_student';
import StudentProfile from './Student/Profile/profile_student';
import StudentResume from './Student/Resume/resume_student';
import AddJob from './Employer/Jobs/AddJob';
import Jobs from './Employer/Jobs/Jobs';

class Main extends Component {
  render() {
    return (
      <div>
        <Route exact path='/student/home' component={StudentHome} />
        <Route exact path='/student/profile' component={StudentProfile} />
        <Route exact path='/student/resume' component={StudentResume} />
        <Route exact path='/employer/addjob' component={AddJob} />
        <Route exact path='/employer/jobs' component={Jobs} />
      </div>
    );
  }
}

export default Main;
