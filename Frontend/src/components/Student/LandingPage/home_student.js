import React, {Component} from 'react';
import StudentNavbar from '../Navbar/navbar_student'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import {Card, Image} from 'react-bootstrap'
import profilePicture from '../images/studentPlaceholder.png'

class StudentHome extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    
    componentWillMount() {
        

    }

    render() {
        return (
            <div> 
                <StudentNavbar />
                <br />
                <br />
                <div className="row">
                <div class="col-4" style={{paddingLeft:"2cm", paddingRight:"1cm"}}>
                    <a href='/student/profile' style={{textDecoration: "none", color: "black"}} onClick={localStorage.setItem('active-list', 'profile')}> 
                    <Card>
                    <Card.Body>
                    <Image src={profilePicture} style={{width:"1.5cm"}} roundedCircle />
                    <br />
                    <br />

                    <Card.Title>
                         <span style={{textTransform:"uppercase", fontWeight: "bolder", fontFamily:"helvetica"}}> FirstName LastName </span>
                    </Card.Title>

                    <Card.Text>
                        <FontAwesomeIcon icon={faBriefcase} /> 
                        <a style={{marginLeft:"8px", textDecoration: "none"}} href='/student/profile/basic' onClick={localStorage.setItem('active-list', 'profile')}>Add Job Title</a>
                    </Card.Text>

                    <Card.Text>
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> 
                        <a style={{marginLeft:"11px", textDecoration: "none"}} href='/student/profile/basic' onClick={localStorage.setItem('active-list', 'profile')}>Add Location</a>
                    </Card.Text>
                    <hr />
                    </Card.Body>
                    </Card>
                    </a>
                </div>

                <div class="col-8" style={{borderLeft:"1px solid #e6e6e6"}}>
                    
                    <h4 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Explore Jobs Near You</h4>
                    <hr />
                    
                </div>
                </div>
            </div>
        )
    }

}
export default StudentHome;