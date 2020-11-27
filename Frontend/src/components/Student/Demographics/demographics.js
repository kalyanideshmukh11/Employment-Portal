import React, {Component} from 'react';
import StudentNavbar from '../Navbar/navbar_student'
import SideBarStudent from '../Navbar/sidebar_student';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faPen } from '@fortawesome/free-solid-svg-icons'
import {Button} from 'react-bootstrap'


class StudentDemographics extends Component {
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
                    <div className="col-4" style={{paddingLeft:"2cm", paddingRight:"1cm"}}> 
                    <SideBarStudent />
                    </div>
                    <div className="col-8" style={{borderLeft:"1px solid #e6e6e6"}}>
                    <h4 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Demographics  </h4>
                    <hr />
                    <h6 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Help End Inequality  </h6>
                    <div className='row'>
                    <div className='col-6'>
                        <span style={{fontSize: '12px'}}>
                    Shine a light on inequities in the workplace. Anonymously share your demographics to help pinpoint pay and diversity disparities.
                    Providing your demographic information is optional and, if provided, it will not be shared with employers. This information will be collected and used in accordance with our Privacy Policy.           
                        </span>
                    </div>
                    </div>
                    <br />
                    <br />
                    <div className='row'>
                        <div className="col">
                        <h5 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Race/Ethnicity  </h5>
                        </div>
                        <div className='col'>
                        <Button variant='link' onClick={this.handleShow} style={{float: 'right', marginRight: '5mm'}} size='sm'>
                        <FontAwesomeIcon style={{color:"gray"}} icon={faPen} size='' />
                        </Button>
                        </div>
                        </div>
                    <hr />
                    <div className='col col-md-3'>
                            <Button variant='link' style={{textDecoration: 'none'}}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            <span style={{marginLeft:"1mm"}}>
                            Add race/ethnicity
                            </span>
                            </Button>
                        </div>
                        <br />
                        <br />
                    
                        <div className='row'>
                        <div className="col">
                        <h5 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Gender  </h5>
                        </div>
                        <div className='col'>
                        <Button variant='link' onClick={this.handleShow} style={{float: 'right', marginRight: '5mm'}} size='sm'>
                        <FontAwesomeIcon style={{marginTop:"", color:"gray"}} icon={faPen} size="s" />
                        </Button>
                        </div>
                        </div>
                    <hr />
                    <div className='col col-md-3'>
                            <Button variant='link' style={{textDecoration: 'none'}}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            <span style={{marginLeft:"1mm"}}>
                            Add gender identity
                            </span>
                            </Button>
                        </div>
                        <br />
                        <br />


                        <div className='row'>
                        <div className="col">
                        <h5 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Sexual Orientation  </h5>
                        </div>
                        <div className='col'>
                        <Button variant='link' onClick={this.handleShow} style={{float: 'right', marginRight: '5mm'}} size='sm'>
                        <FontAwesomeIcon style={{marginTop:"", color:"gray"}} icon={faPen} size="sm" />
                        </Button>
                        </div>
                        </div>
                    <hr />
                    <div className='col col-md-4'>
                            <Button variant='link' style={{textDecoration: 'none'}}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            <span style={{marginLeft:"1mm"}}>
                            Add sexual orientation
                            </span>
                            </Button>
                        </div>
                        <br />
                        <br />


                        <div class='row'>
                        <div class="col">
                        <h5 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Disability  </h5>
                        </div>
                        <div class='col'>
                        <Button variant='link' onClick={this.handleShow} style={{float: 'right', marginRight: '5mm'}} size='sm'>
                        <FontAwesomeIcon style={{marginTop:"", color:"gray"}} icon={faPen} size="sm" />
                        </Button>
                        </div>
                        </div>
                    <hr />
                    <div class='col col-md-3'>
                            <Button variant='link' style={{textDecoration: 'none'}}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            <span style={{marginLeft:"1mm"}}>
                            Add disability
                            </span>
                            </Button>
                        </div>
                        <br />
                        <br />


                        <div class='row'>
                        <div class="col">
                        <h5 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Parent or Caregiver  </h5>
                        </div>
                        <div class='col'>
                        <Button variant='link' onClick={this.handleShow} style={{float: 'right', marginRight: '5mm'}} size='sm'>
                        <FontAwesomeIcon style={{marginTop:"", color:"gray"}} icon={faPen} size="sm" />
                        </Button>
                        </div>
                        </div>
                    <hr />
                    <div class='col col-md-4'>
                            <Button variant='link' style={{textDecoration: 'none'}}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            <span style={{marginLeft:"1mm"}}>
                            Add parent or caregiver
                            </span>
                            </Button>
                        </div>
                        <br />
                        <br />

                        <div class='row'>
                        <div class="col">
                        <h5 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Veteran Status  </h5>
                        </div>
                        <div class='col'>
                        <Button variant='link' onClick={this.handleShow} style={{float: 'right', marginRight: '5mm'}} size='sm'>
                        <FontAwesomeIcon style={{marginTop:"", color:"gray"}} icon={faPen} size="sm" />
                        </Button>
                        </div>
                        </div>
                    <hr />
                    <div class='col col-md-3'>
                            <Button variant='link' style={{textDecoration: 'none'}}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            <span style={{marginLeft:"1mm"}}>
                            Add veteran status
                            </span>
                            </Button>
                        </div>
                        <br />
                        <br />


                    </div>
                </div>
            </div>
        ) 
    }
}

export default StudentDemographics