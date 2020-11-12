import React, {Component} from 'react';
import StudentNavbar from '../Navbar/navbar_student'
import SideBarStudent from '../Navbar/sidebar_student';


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
                    <h4 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Manage Resumes</h4>
                    < hr />
                    
                </div>
                </div>
            </div>
        ) 
    }
}

export default StudentResume