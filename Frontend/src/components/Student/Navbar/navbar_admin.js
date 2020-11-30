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

class AdminNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false, SearchType: 'Jobs' };
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleLogout = () => {};

  SearchType = (e) => {
    this.setState({
      SearchType: e,
    });
  };

  render() {
    return (
      <div>
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
            <Button style={{backgroundColor: "transparent", color: 'black', borderColor: "grey"}}><i class="fas fa-search"></i></Button>
          </Form>
          <Nav>
            <Button
              onClick={this.handleSearch}
              variant = 'success'
              style={{
                marginLeft: '25mm',
              }}
              type='submit'
            >
              {' '}
              Reviews and Photos{' '}
            </Button>
            <Button
              onClick={this.handleSearch}
              variant = 'success'
              style={{
                marginLeft: '5mm',
              }}
              type='submit'
            >
              {' '}
              Company Profile{' '}
            </Button>
            <Button
              onClick={this.handleSearch}
              variant = 'success'
              style={{
                marginLeft: '5mm',
              }}
              type='submit'
            >
              {' '}
              Analytics Dashboard{' '}
            </Button>
            <NavDropdown
              style={{ marginLeft: '1cm' }}
              title={
                <FontAwesomeIcon
                  style={{ color: 'black' }}
                  icon={faUserCircle}
                  size='5px'
                />
              }
              onMouseEnter={this.handleOpen}
              onMouseLeave={this.handleClose}
              show={this.state.isOpen}
              action
              variant='light'
            >
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

export default AdminNavbar;
