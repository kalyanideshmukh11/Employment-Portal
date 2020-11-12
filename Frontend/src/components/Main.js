import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import StudentHome from './LandingPage/home_student';
import StudentProfile from './Profile/profile_student';
import StudentResume from './Resume/resume_student'

class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/student/home" component={StudentHome} />
                <Route exact path="/student/profile" component={StudentProfile} />
                <Route exact path="/student/resume" component={StudentResume} />

            </div>
        )
    }
}

export default Main;