import React, {Component} from 'react';
import StudentNavbar from '../Navbar/navbar_student'
import SideBarStudent from '../Navbar/sidebar_student';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import {Button} from 'react-bootstrap'


class StudentResume extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
        
    }
    render() {


        return (
            <div>
                <StudentNavbar />
                <br />
                <br />

                <div className='row'>
                    <div class="col-4" style={{paddingLeft:"2cm", paddingRight:"1cm"}}> 
                    <SideBarStudent />
                    </div>
                    <div class="col-8" style={{borderLeft:"1px solid #e6e6e6"}}>
                    <h4 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Manage Resumes 
                        <Button variant='link' style={{textDecoration: 'none', float: 'right', marginRight: '10mm'}}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        </Button>
                        </h4>                   
                        
                     < hr />
                    
                </div>
                </div>
            </div>
        ) 
    }
}

export default StudentResume