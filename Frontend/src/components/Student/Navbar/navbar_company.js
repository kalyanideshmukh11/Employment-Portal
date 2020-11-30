import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Image,
  DropdownButton,
  Dropdown,
  InputGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import glassdorNavIco from '../images/glassdoor-logotype-rgb.png';
import { Redirect } from 'react-router';

class StudentNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false, SearchType: 'Jobs', redirectVar: null };
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleLogout = () => {
    localStorage.removeItem('sql_company_id');
    localStorage.removeItem('name');
    localStorage.removeItem('type');
    this.setState({
      redirectVar: <Redirect to='/student/login' />,
    });
  };

  SearchType = (e) => {
    this.setState({
      SearchType: e,
    });
  };

  render() {
    return (
      <div>
        {this.state.redirectVar}
        <Navbar bg='light' expand='lg'>
          <Navbar.Brand href='/student/home'>
            <Image src={glassdorNavIco} style={{ width: '200px' }} />
          </Navbar.Brand>
          <Form inline>
            <FormControl
              type='text'
              placeholder='Job Title, Keywords, or Company'
              className='mr-sm-3'
              style={{ width: '10cm' }}
              onChange
            />

            <InputGroup>
              <FormControl
                type='text'
                placeholder='What?'
                className='mr-xs-10'
                value={this.state.SearchType}
                onChange
              />
              <DropdownButton
                as={InputGroup.Append}
                variant='light'
                title=''
                name='searchType'
                menuAlign='right'
                style={{ marginLeft: '0.1mm' }}
                onSelect={this.SearchType}
              >
                <Dropdown.Item eventKey='Jobs'>Jobs</Dropdown.Item>
                <Dropdown.Item eventKey='Companies'>Companies</Dropdown.Item>
                <Dropdown.Item eventKey='Salaries'>Salaries</Dropdown.Item>
                <Dropdown.Item eventKey='Interviews'>Interviews</Dropdown.Item>
              </DropdownButton>
            </InputGroup>

            <FormControl
              style={{ marginLeft: '5mm' }}
              type='text'
              placeholder='Location'
              className='mr-sm-4'
              onChange
            />
            <Button variant='success'>Search</Button>
          </Form>
          <Nav>
            <Button
              onClick={this.handleSearch}
              style={{
                marginLeft: '5mm',
                height: '50px',
                background: 'transparent',
                color: '#555555',
                border: 'none',
              }}
              type='submit'
            >
              {' '}
              <i className='fas fa-briefcase'></i> Jobs{' '}
            </Button>
            <NavDropdown
              style={{ marginLeft: '1cm' }}
              title={
                <FontAwesomeIcon
                  style={{ color: 'black' }}
                  icon={faUserCircle}
                  size='2px'
                />
              }
              onMouseEnter={this.handleOpen}
              onMouseLeave={this.handleClose}
              show={this.state.isOpen}
              action
              variant='light'
            >
              <NavDropdown.Item
                href='/student/profile'
                style={{ padding: '15px 15px 15px 15px' }}
                onClick={() => {
                  localStorage.setItem('active-list', 'profile');
                }}
              >
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item
                href='/student/resume'
                style={{ padding: '15px 15px 15px 15px' }}
                onClick={() => {
                  localStorage.setItem('active-list', 'resume');
                }}
              >
                Resumes
              </NavDropdown.Item>
              <NavDropdown.Item
                href='/student/jobPreference'
                style={{ padding: '15px 15px 15px 15px' }}
                onClick={() => {
                  localStorage.setItem('active-list', 'jobPreference');
                }}
              >
                Job Preference
              </NavDropdown.Item>
              <NavDropdown.Item
                href='/student/demographics'
                style={{ padding: '15px 15px 15px 15px' }}
                onClick={() => {
                  localStorage.setItem('active-list', 'demographics');
                }}
              >
                Demographics
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href='/student/contributions'
                style={{ padding: '10px 15px 10px 15px' }}
              >
                Contributions
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={this.handleLogout}
                style={{ padding: '10px 15px 10px 15px' }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default StudentNavbar;
