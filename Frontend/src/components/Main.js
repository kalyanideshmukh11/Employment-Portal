import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import StudentHome from './Student/LandingPage/home_student';
import StudentProfile from './Student/Profile/profile_student';
import StudentResume from './Student/Resume/resume_student';
import StudentJobPreferences from './Student/JobPreferences/jobpreferences';
import StudentDemographics from './Student/Demographics/demographics';
import SalaryContribution from './Student/Contributions/salaries';
import ReviewContribution from './Student/Contributions/reviews';
import PhotosContribution from './Student/Contributions/photos';
import InterviewContribution from './Student/Contributions/interviews';
import Login from './Student/Login/Login';
import CompanyLogin from './Employer/Login/companyLogin';
import companyProfile from './Employer/companyProfile';
import updateCompany from './Employer/update';
import AddJob from './Employer/Jobs/AddJob';
import Jobs from './Employer/Jobs/Jobs';
import companyReviews from './Employer/companyReviews';
import AddInterview from './Student/Interview/AddInterview';
import SearchJob from './Student/Search/search_jobs';
import SearchCompany from './Student/Search/search_company';
import SearchInterview from './Student/Search/search_interview';
import ReviewTab from './Student/Reviews/ReviewTab';
import AddReview from './Student/Reviews/AddReview';
import SalaryTab from './Student/Salary/AddSalary';
import HomeTabs from './Student/Tabs/homeTabs';
import SearchSalary from './Student/Search/search_salary';
import ApexChart from './Admin/dummy';

class Main extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Login} />
        <Route exact path='/student/home' component={StudentHome} />
        <Route exact path='/student/profile' component={StudentProfile} />
        <Route exact path='/student/resume' component={StudentResume} />
        <Route
          exact
          path='/student/jobPreference'
          component={StudentJobPreferences}
        />
        <Route
          exact
          path='/student/demographics'
          component={StudentDemographics}
        />
        <Route
          exact
          path='/student/contributions/salaries'
          component={SalaryContribution}
        />
        <Route
          exact
          path='/student/contributions/reviews'
          component={ReviewContribution}
        />
        <Route
          exact
          path='/student/contributions/interviews'
          component={InterviewContribution}
        />
        <Route
          exact
          path='/student/contributions/photos'
          component={PhotosContribution}
        />
        <Route exact path='/student/login' component={Login} />
        <Route exact path='/company/login' component={CompanyLogin} />
        <Route exact path='/company/home' component={companyProfile} />
        <Route exact path='/company/profileUpdate' component={updateCompany} />
        <Route exact path='/company/addjob' component={AddJob} />
        <Route exact path='/company/jobs' component={Jobs} />
        <Route exact path='/company/reviews' component={companyReviews} />
        <Route exact path='/student/interview/add' component={AddInterview} />
        <Route
          exact
          path='/student/search/job/:keyword'
          component={SearchJob}
        />
        <Route
          exact
          path='/student/search/company/:keyword'
          component={SearchCompany}
        />
        <Route
          exact
          path='/student/search/interview/:keyword'
          component={SearchInterview}
        />
        <Route
          exact
          path='/student/search/salary/:keyword'
          component={SearchSalary}
        />
        <Route exact path='/student/reviews' component={ReviewTab} />
        <Route exact path='/student/addreviews' component={AddReview} />
        <Route exact path='/student/salary' component={SalaryTab} />
        <Route exact path='/student/tabs' component={HomeTabs} />
        <Route exact path='/admin/home' component={ApexChart} />
      </div>
    );
  }
}

export default Main;
