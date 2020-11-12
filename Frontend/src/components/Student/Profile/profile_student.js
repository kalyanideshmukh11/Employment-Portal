import React, {Component} from 'react';
import StudentNavbar from '../Navbar/navbar_student'
import SideBarStudent from '../Navbar/sidebar_student';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import {Button} from 'react-bootstrap'
import BasicProfileModal from './basicProfile_modalForm_student'

class StudentProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            show: false,
            setShow: false
        }
        
    }
    handleClose = () => this.setState({setShow: false});
    handleShow = () => this.setState({setShow: true});

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
                        <div class='row'>
                        <div class="col">
                        <h4 style={{fontFamily:"helvetica", fontWeight:"bold"}}> FirstName LastName  </h4>
                        </div>
                        <div class='col'>
                        <Button variant='link' onClick={this.handleShow} >
                        <FontAwesomeIcon style={{marginTop:"", color:"gray"}} icon={faPen} size="s" />
                        </Button>
                        <BasicProfileModal />
                        </div>
                        </div>


                    <div class='row'>
                        <div class='col col-md-3'>
                            <Button variant='link' style={{textDecoration: 'none'}}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            <span style={{marginLeft:"1mm"}}>
                            Add job title
                            </span>
                            </Button>
                        </div>
                        <div class='col col-sm-2'>
                            <Button variant='link' style={{textDecoration: 'none'}}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            <span style={{marginLeft:"1mm"}}>
                            Add email
                            </span>
                            </Button>
                        </div>
                        <div class='col col-md-4'>
                            <Button variant='link' style={{textDecoration: 'none', marginLeft:"12mm"}}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            <span style={{marginLeft:"1mm"}}>
                            Add phone number
                            </span>
                            </Button>
                        </div>
                    </div>

                    <div class='row'>
                        <div class='col col-md-3'>
                        <Button variant='link' style={{textDecoration: 'none'}}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            <span style={{marginLeft:"1mm"}}>
                            Add location
                            </span>
                            </Button>
                        </div>
                        <div class='col'>
                        <Button variant='link' style={{textDecoration: 'none'}}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            <span style={{marginLeft:"1mm"}}>
                            Add website
                            </span>
                            </Button>
                        </div>
                    </div>
                    <br />
                    <br />
                        <h4 style={{fontFamily:"helvetica", fontWeight:"bold"}}> About Me  
                        <Button variant='link' style={{textDecoration: 'none'}}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        </Button>
                        </h4>
                        <hr />
                        <Button variant='link' style={{textDecoration: 'none'}}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        <span style={{color:"black", marginLeft:"1.5mm"}}> 
                        Add an introduction about yourself with a brief summary of your experience.
                        </span>
                        </Button>


                    <br />
                    <br />
                    <br />
                        <h4 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Experience 
                        <Button variant='link' style={{textDecoration: 'none'}}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        </Button>
                        </h4>
                        <hr />

                    <br />
                    <br />
                    <br />
                        <h4 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Skills  
                        <Button variant='link' style={{textDecoration: 'none'}}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        </Button>
                        </h4>
                        <hr />
                    
                    <br />
                    <br />
                    <br />
                        <h4 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Education  
                        <Button variant='link' style={{textDecoration: 'none'}}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        </Button>
                        </h4>
                        <hr />
                    
                </div>
                </div>
            </div>
        ) 
    }
}

export default StudentProfile