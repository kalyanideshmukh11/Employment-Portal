import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import StudentHome from './Student/LandingPage/home_student';
import StudentProfile from './Student/Profile/profile_student';
import StudentResume from './Student/Resume/resume_student';
import Login from './Student/Login/Login';

class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/student/home" component={StudentHome} />
                <Route exact path="/student/profile" component={StudentProfile} />
                <Route exact path="/student/resume" component={StudentResume} />
                <Route exact path="/login" component={Login} />
            </div>
        )
    }
}

export default Main;