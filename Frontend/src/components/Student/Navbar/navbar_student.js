<<<<<<< HEAD
import React, { Component } from 'react';
//import yelpLoginImage from './images/yelp_logo.jpg';
import {Button, Nav, FormControl, Dropdown, Navbar, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import glassdorNavIco from '../images/glassdoor-logotype-rgb.png'
//import { Redirect} from 'react-router';
//import { Link } from 'react-router-dom';

class navigationBar extends Component {
=======
import React,{Component} from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Image, DropdownButton, Dropdown, InputGroup} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import glassdorNavIco from '../images/glassdoor-logotype-rgb.png'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
>>>>>>> origin/master

class StudentNavbar extends Component {
    constructor(props) {
        super(props)
        this.state = { isShow: false,
        SearchType: 'Jobs',
        searchKeyword: "",
        }
    }

    handleOpen = () => {
        this.setState({ isOpen: true })
      }
    
    handleClose = () => {
         this.setState({ isOpen: false })
      }

    handleLogout = () => {

    }
    searchChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            searchKeyword: e.target.value
        })
    }
    

    SearchType = (e) => {
        this.setState({
            SearchType: e
        })
    }

    render() {
        return (
            <div> 
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/student/home">
                        <Image src={glassdorNavIco} style={{width:"200px"}} />
                    </Navbar.Brand>
                    <Form inline>
                    <FormControl type="text" placeholder="Job Title, Keywords, or Company" className="mr-sm-3" style={{width: "10cm"}} onChange={this.searchChangeHandler}/>
                    
                    <InputGroup>
                        <FormControl type="text" placeholder="What?" className="mr-xs-10" value={this.state.SearchType} />
                        <DropdownButton as={InputGroup.Append} variant="light"
                        title=''
                        name='searchType'
                        menuAlign="right" style={{marginLeft:"0.1mm"}}
                        onSelect={ this.SearchType }>
                        <Dropdown.Item eventKey="Jobs">Jobs</Dropdown.Item>
                        <Dropdown.Item eventKey="Companies">Companies</Dropdown.Item>
                        <Dropdown.Item eventKey="Salaries">Salaries</Dropdown.Item>
                        <Dropdown.Item eventKey="Interviews">Interviews</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>

<<<<<<< HEAD
render() {
return (
    <React.Fragment>
        <Nav class="navbar navbar-expand-md bg-light">
            <div>
                <form class="form-inline mx-auto">
                <Navbar.Brand href="/student/home">
                        <Image src={glassdorNavIco} style={{width:"200px"}} />
                    </Navbar.Brand>
                <br />
                <FormControl style={{width:"400px", marginRight: "5px" }} type="search" placeholder="Companies" autoComplete='on' onChange={this.searchChangeHandler}/>
                    <select
                        style={{width: "150px"}}
                        class='custom-select input-group'
                        onChange={this.handleInputChange}>
                        <option selected>Search...</option>
                        <option value='1'>Jobs</option>
                        <option value='2'>Companies</option>
                        <option value='3'>Salaries</option>
                        <option value='4'>Interviews</option>
                    </select>
                    <FormControl style={{width:"275px", marginLeft: "5px"}} list="searchWord" class="form-control lg-5" type="search" placeholder="Location" aria-label="Search" autoComplete='on' onChange={this.searchChangeHandler}/>
                    <Button onClick={this.handleSearch} style = {{ marginLeft: "10px", marginRight: "40px", height:"38px", borderRadius:"5px", background: "green", color: "white", border: "1px solid green", cursor: "pointer"}} type="submit">Search</Button>
                    <Dropdown>
                        <Dropdown.Toggle style={{fontSize: "25px",backgroundColor: "transparent", color: "#555555", border: "none", marginLeft: "60px"}}id="dropdown-basic"> <i class="far fa-user-circle"></i></Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item style={{background: "none"}}onClick={this.handleClick}>Profile</Dropdown.Item>
                            <Dropdown.Item >Resumes</Dropdown.Item>
                            <Dropdown.Item >Job Preferences</Dropdown.Item>
                            <Dropdown.Item >Demographics</Dropdown.Item>
                            <hr />
                            <Dropdown.Item >Contributions</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleLogout}>Company Follows</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleLogout}>Emails & Alerts</Dropdown.Item>
                            <hr />
                            <Dropdown.Item onClick={this.handleLogout}>Account Settings</Dropdown.Item>
                            <hr />
                            <Dropdown.Item onClick={this.handleLogout}>Help center </Dropdown.Item>
                            <Dropdown.Item onClick={this.handleLogout}>Sign Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </form>
                </div>
            </Nav>
            <Nav class="navbar navbar-expand-md bg-light" style={{borderTop: "0.5px solid #a9a9a9"}}>
            <div>
=======
                    <FormControl style={{marginLeft:"5mm"}} type="text" placeholder="Location" className="mr-sm-4" />
                    <Button variant="success">Search</Button>
                    </Form>
                    <Nav>
                    <NavDropdown 
                    style={{marginLeft:"1cm"}} 
                    title= {<i className="far fa-user-circle" style={{fontSize: '30px'}}></i>} 
                    onMouseEnter = { this.handleOpen }
                    onMouseLeave = { this.handleClose }
                    show={ this.state.isOpen }
                    action variant='light'>
                        <NavDropdown.Item href="/student/profile" style={{padding:"15px 15px 15px 15px"}} onClick={()=>{localStorage.setItem('active-list', 'profile')}}>Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/student/resume" style={{padding:"15px 15px 15px 15px"}} onClick={()=>{localStorage.setItem('active-list', 'resume')}}>Resumes</NavDropdown.Item>
                        <NavDropdown.Item href="/student/jobPreference" style={{padding:"15px 15px 15px 15px"}} onClick={()=>{localStorage.setItem('active-list', 'jobPreference')}}>Job Preference</NavDropdown.Item>
                        <NavDropdown.Item href="/student/demographics" style={{padding:"15px 15px 15px 15px"}} onClick={()=>{localStorage.setItem('active-list', 'demographics')}}>Demographics</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/student/contributions/salaries" style={{padding:"15px 15px 15px 15px"}} >Contributions</NavDropdown.Item>
                        <NavDropdown.Item href="" style={{padding:"15px 15px 15px 15px"}} >Company Follows</NavDropdown.Item>
                        <NavDropdown.Item href="" style={{padding:"15px 15px 15px 15px"}} >Emails & Alerts</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="" style={{padding:"10px 15px 10px 15px"}} >Account Settings</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="" style={{padding:"15px 15px 15px 15px"}} >Help Center</NavDropdown.Item>
                        <NavDropdown.Item onClick={this.handleLogout} style={{padding:"15px 15px 15px 15px"}}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>    
                </Navbar>
                <Nav class="navbar navbar-expand-md bg-light" style={{borderTop: "0.5px solid #a9a9a9"}}>
                <div>
>>>>>>> origin/master
                <form class="form-inline mx-auto">
                        <Dropdown>
                                <Dropdown.Toggle style={{fontSize: "15px",backgroundColor: "transparent", color: "#555555", border: "none", marginLeft: "5px"}}id="dropdown-basic"> <i class="fas fa-briefcase"></i> Jobs</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item style={{background: "none"}}>Recent Activity</Dropdown.Item>
                                    <Dropdown.Item >Career Insights</Dropdown.Item>
                                    <Dropdown.Item >Job Alerts</Dropdown.Item>
                                    <Dropdown.Item >Saved</Dropdown.Item>
                                    <Dropdown.Item >Applications</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Toggle style={{fontSize: "15px",backgroundColor: "transparent", color: "#555555", border: "none", marginLeft: "5px"}}id="dropdown-basic"> <i class="far fa-building"></i> Companies</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item style={{background: "none"}}>Discover companies</Dropdown.Item>
                                    <Dropdown.Item>Compare Companies </Dropdown.Item>
                                    <Dropdown.Item>Suggested Follows</Dropdown.Item>
                                    <Dropdown.Item>Write a Review</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Toggle style={{fontSize: "15px",backgroundColor: "transparent", color: "#555555", border: "none", marginLeft: "5px"}}id="dropdown-basic"> <i class="fas fa-money-bill"></i> Salaries</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item style={{background: "none"}}>Discover salary</Dropdown.Item>
                                    <Dropdown.Item>Salary Calculator </Dropdown.Item>
                                    <Dropdown.Item >Analyze Offer</Dropdown.Item>
                                    <Dropdown.Item >Add a Salary</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Toggle style={{fontSize: "15px",backgroundColor: "transparent", color: "#555555", border: "none", marginLeft: "5px"}}id="dropdown-basic"> <i class="far fa-comments"></i> Interviews </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item style={{background: "none"}}onClick={this.handleClick}>Discover Interviews</Dropdown.Item>
                                    <Dropdown.Item onClick={this.handleLogout}>Add an Interview</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                </form>
                </div>
            </Nav>
            </div>
            
        )
    }

}

export default StudentNavbar