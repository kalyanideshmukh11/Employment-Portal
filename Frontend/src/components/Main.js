import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import StudentHome from './Student/LandingPage/home_student';
import StudentProfile from './Student/Profile/profile_student';
import StudentResume from './Student/Resume/resume_student';
import Login from './Student/Login/Login';
import CompanyLogin from './Employer/Login/companyLogin';
import companyProfile from './Employer/companyProfile';
import updateCompany from './Employer/update';
import AddJob from './Employer/Jobs/AddJob';
import Jobs from './Employer/Jobs/Jobs';
import companyReviews from './Employer/companyReviews';

class Main extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Login} />
        <Route exact path='/student/home' component={StudentHome} />
        <Route exact path='/student/profile' component={StudentProfile} />
        <Route exact path='/student/resume' component={StudentResume} />
        <Route exact path='/student/login' component={Login} />
        <Route exact path='/company/login' component={CompanyLogin} />
        <Route exact path='/company/home' component={companyProfile} />
        <Route exact path='/company/profileUpdate' component={updateCompany} />
        <Route exact path='/company/addjob' component={AddJob} />
        <Route exact path='/company/jobs' component={Jobs} />
        <Route exact path='/company/reviews' component={companyReviews} />
      </div>
    );
  }
}

export default Main;
