import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import StudentHome from './Student/LandingPage/home_student';
import StudentProfile from './Student/Profile/profile_student';
import StudentResume from './Student/Resume/resume_student'
import StudentJobPreferences from './Student/JobPreferences/jobpreferences'
import StudentDemographics from './Student/Demographics/demographics';
import SalaryContribution from './Student/Contributions/salaries';
import ReviewContribution from './Student/Contributions/reviews';
import PhotosContribution from './Student/Contributions/photos';
import InterviewContribution from './Student/Contributions/interviews';

import StudentResume from './Student/Resume/resume_student';
import Login from './Student/Login/Login';
import CompanyLogin from './Employer/Login/companyLogin';

class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/student/home" component={StudentHome} />
                <Route exact path="/student/profile" component={StudentProfile} />
                <Route exact path="/student/resume" component={StudentResume} />
                <Route exact path="/student/jobPreference" component={StudentJobPreferences} />
                <Route exact path="/student/demographics" component={StudentDemographics} />
                <Route exact path="/student/contributions/salaries" component={SalaryContribution} />
                <Route exact path="/student/contributions/reviews" component={ReviewContribution} />
                <Route exact path="/student/contributions/interviews" component={InterviewContribution} />
                <Route exact path="/student/contributions/photos" component={PhotosContribution} />






                <Route exact path="/student/login" component={Login} />
                <Route exact path="/company/login" component={CompanyLogin} />
            </div>
        )
    }
}

export default Main;