import React,{Component} from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Image, DropdownButton, Dropdown, InputGroup} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import glassdorNavIco from '../images/glassdoor-logotype-rgb.png'

class StudentNavbar extends Component {
    constructor(props) {
        super(props)
        this.state = { isShow: false,
        SearchType: 'Jobs' 
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
                    <FormControl type="text" placeholder="Job Title, Keywords, or Company" className="mr-sm-3" style={{width: "10cm"}} />
                    
                    <InputGroup>
                        <FormControl type="text" placeholder="What?" className="mr-xs-10" value={this.state.SearchType} />
                        <DropdownButton as={InputGroup.Append} variant="light"
                        name='searchType'
                        menuAlign="right" style={{marginLeft:"0.1mm"}}
                        onSelect={ this.SearchType }>
                        <Dropdown.Item eventKey="Jobs">Jobs</Dropdown.Item>
                        <Dropdown.Item eventKey="Companies">Companies</Dropdown.Item>
                        <Dropdown.Item eventKey="Salaries">Salaries</Dropdown.Item>
                        <Dropdown.Item eventKey="Interviews">Interviews</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>

                    <FormControl style={{marginLeft:"5mm"}} type="text" placeholder="Location" className="mr-sm-4" />
                    <Button variant="success">Search</Button>
                    </Form>
                    <Nav>
                    <Button onClick={this.handleSearch} style = {{marginLeft: "10mm", height:"50px", background: "transparent", color: "#555555", border: "none"}} type="submit"> <i class="fas fa-briefcase"></i> Jobs </Button>
                    <NavDropdown 
                    style={{marginLeft:"1cm"}} 
                    title= {<FontAwesomeIcon style={{color:"black"}} icon={faUserCircle} size="2x"/> } 
                    onMouseEnter = { this.handleOpen }
                    onMouseLeave = { this.handleClose }
                    show={ this.state.isOpen }
                    noCaret
                    action variant='light'>
                        <NavDropdown.Item href="/student/profile" style={{padding:"15px 15px 15px 15px"}} onClick={()=>{localStorage.setItem('active-list', 'profile')}}>Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/student/resume" style={{padding:"15px 15px 15px 15px"}} onClick={()=>{localStorage.setItem('active-list', 'resume')}}>Resumes</NavDropdown.Item>
                        <NavDropdown.Item href="/student/jobPreference" style={{padding:"15px 15px 15px 15px"}} onClick={()=>{localStorage.setItem('active-list', 'jobPreference')}}>Job Preference</NavDropdown.Item>
                        <NavDropdown.Item href="/student/demographics" style={{padding:"15px 15px 15px 15px"}} onClick={()=>{localStorage.setItem('active-list', 'demographics')}}>Demographics</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/student/contributions" style={{padding:"10px 15px 10px 15px"}} >Contributions</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={this.handleLogout} style={{padding:"10px 15px 10px 15px"}}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>    
                </Navbar>
            </div>
        )
    }

}

export default StudentNavbar