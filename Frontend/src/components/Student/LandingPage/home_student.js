import React, {Component} from 'react';
import StudentNavbar from '../Navbar/navbar_student'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import {Card, Image} from 'react-bootstrap'
import profilePicture from '../images/studentPlaceholder.png'
import axios from 'axios'
import backendServer from "../../../webConfig"


class StudentHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            studentHome_data: {}

        }
    }
    
    componentWillMount() {
        axios.get(`${backendServer}student/home/${localStorage.getItem("sql_student_id")}`, 
        {headers: { Authorization: `${localStorage.getItem("token")}` }
        })
        .then(response => {
            this.setState({
                studentHome_data: response.data[0]
            })
        })

    }

    render() {
        let details = this.state.studentHome_data
        let job_title, location
        if(details.job_title === null){
            job_title = (<a style={{marginLeft:"8px", textDecoration: "none"}} 
            href='/student/profile' onClick={localStorage.setItem('active-list', 'profile')}>Add Job Title</a>)
        } else {
            job_title = (<a style={{marginLeft:"8px", textDecoration: "none"}}>{details.job_title}</a>)
        }
        if(details.city === null){
            location = (<a style={{marginLeft:"11px", textDecoration: "none"}} 
            href='/student/profile' onClick={localStorage.setItem('active-list', 'profile')}>Add Location</a>)

        } else {
            location = (<a style={{marginLeft:"11px", textDecoration: "none"}}>{details.city}</a>)
        }
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
                         <span style={{textTransform:"uppercase", fontWeight: "bolder", fontFamily:"helvetica"}}> {details.first_name} {details.last_name} </span>
                    </Card.Title>

                    <Card.Text>
                        <FontAwesomeIcon icon={faBriefcase} /> 
                        {job_title}
                    </Card.Text>

                    <Card.Text>
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> 
                        {location}
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