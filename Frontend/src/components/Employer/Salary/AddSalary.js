import React, { Component } from 'react';
import Navbar from '../../Student/Navbar/navbar_student';
import { Link } from 'react-router-dom';
import {Container,Modal,Col,Row, Form, Button,Alert, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { insertNewSalaryDetails,getSalaryDetails } from '../../../store/actions/companySalaryAction';
import "react-bootstrap/ModalHeader";
class AddSalary extends Component {
  constructor(props) {
    super(props);
    this.state = {show:false};
    this.changeHandler = this.changeHandler.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCheckboxChange(e) {
    this.setState({ workType: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const salaryData = {
      companyName: this.state.companyName,
      rating: this.state.rating,
      description: this.state.description,
      headline: this.state.headline,
      pros: this.state.pros,
      cons: this.state.cons,
      helpfull: this.state.helpfull,
      ceo_rating: this.state.ceo_rating,
      recommended: this.state.recommended,
    };
    console.log(salaryData);
    this.props.insertNewSalaryDetails(salaryData);
    this.props.getSalaryDetails(salaryData);
  }
   
 
   
  render() {
    return (
        <Container className="mt-5 mb-5">                                           
                    <Row>
        <Navbar />             
        <Col sm={8} md={8} lg={8}>
              <h4 style={{ color: '#3BB143', float: 'left' }}>Salary range of all the job title</h4>
              <br />
              </Col>
<Col sm={4} md={4} lg={4}>
        <Modal show={this.state.show} handleClose={this.hideModal}>
        <Modal.Header closeButton onClick={this.hideModal}>
          <Modal.Title>Add a Salary</Modal.Title>
        </Modal.Header>
          <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <h12>Your anonymous salary will help other job seekers.</h12>
            <br></br>
            <h6> Salary Details*</h6>           
                <Form.Group> 
                  <Form.Label>
                   Base Salary*
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='base_salary'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                
                <Form.Group>
                  <Form.Label>
                    Bonus?
                  </Form.Label>
                  <Form.Check
                    name='bonus'
                    label='Yes'
                    value='true'
                    onChange={this.handleCheckboxChange}
                  />
                  <Form.Check
                    name='bonus'
                    label='No'
                    value='false'
                    onChange={this.handleCheckboxChange}
                  />
                </Form.Group>
                <Form.Group> 
                  <Form.Label>
                  Cash Bonus
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='number'
                    name='cash_bonus'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group> 
                  <Form.Label>
                   Stock Bonus
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='number'
                    name='stock_bonus'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group> 
                  <Form.Label>
                  Profit Bonus
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='number'
                    name='profit_bonus'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group> 
                  <Form.Label>
                  Gratuities
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='number'
                    name='gratuities'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <h6>Job Details*</h6>
                <Form.Group>
                  <Form.Label>
                    Company
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='company'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group> 
                  <Form.Label>
                    Job Title*
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='job_title'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group> 
                  <Form.Label>
                    Years of Experience*
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='headline'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group> 
                  <Form.Label>
                    Location*
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='pros'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                  <ButtonGroup aria-label='First group' className='mt-2'>
                  <Button variant='success' type='submit'>
                    Submit
                  </Button>
                </ButtonGroup>
              </Form>
          </Modal.Body>
          <Modal.Footer>
        
        </Modal.Footer>
        </Modal>

        <Button variant="success"onClick={this.showModal}>Add Salary</Button>
        

                </Col>
                </Row>
</Container>

    );
  }
  
}

AddSalary.propTypes = {
  insertNewSalaryDetails: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired,
  getSalaryDetails:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  //status: state.salary.status,
});

export default connect(mapStateToProps, { insertNewSalaryDetails, getSalaryDetails})(AddSalary);
