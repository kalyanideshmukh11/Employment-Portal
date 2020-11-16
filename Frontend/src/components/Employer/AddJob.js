import React, { Component } from 'react';
import Navbar from '../Student/Navbar/navbar_student';
import { Link } from 'react-router-dom';
import { Form, Button, ButtonGroup } from 'react-bootstrap';

class AddJob extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className='container'>
          <div className='row'>
            <div className='col-md-5 ml-5 mb-5 mt-3'>
              <h4 style={{ color: '#3BB143', float: 'left' }}>Add New Job</h4>
              <br />
              <hr className='mb-3'></hr>
              <Form>
                <Form.Group>
                  <Form.Label>
                    <strong>Company Name</strong>
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='companyName'></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Job Title</strong>
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='title'></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Industry</strong>
                  </Form.Label>
                  <Form.Control type='text' name='industry'></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Country</strong>
                  </Form.Label>
                  <Form.Control type='text' name='country'></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    name='remote'
                    label='Remote'
                    value='Remote'
                    // onChange={this.handleCheckboxChange}
                  />
                  <Form.Check
                    name='inPerson'
                    label='In Person'
                    value='inPerson'
                    // onChange={this.handleCheckboxChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Street Address</strong>
                  </Form.Label>
                  <Form.Control type='text' name='address'></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>City</strong>
                  </Form.Label>
                  <Form.Control type='text' name='city'></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>State</strong>
                  </Form.Label>
                  <Form.Control type='text' name='state'></Form.Control>
                </Form.Group>
                <ButtonGroup aria-label='First group' className='mt-2'>
                  <Button variant='success' type='submit'>
                    Save Changes
                  </Button>
                </ButtonGroup>
                <Link to={{}}>
                  <a style={{ marginLeft: '15px' }}>Cancel</a>
                </Link>
              </Form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddJob;
