import React, { Component } from 'react';
import Navbar from '../../Student/Navbar/navbar_student';
import { Link } from 'react-router-dom';
import {Container,Modal,Col,Row, Form, Dropdown,Button,Alert, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { insertNewSalaryDetails,getSalaryDetails } from '../../../store/actions/studentSalaryAction';
import "react-bootstrap/ModalHeader";
import axios from 'axios';
import backendServer from '../../../webConfig';
import { SalaryList } from './SalaryList';
class AddSalary extends Component {
  constructor(props) {
    super(props);
    this.state = {show:false};
    this.changeHandler = this.changeHandler.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
  }

  componentDidMount() {
   const data=  this.getSalary();
    console.log(data)
  }
getSalary=() =>{
  console.log("running")
  axios.get(`${backendServer}student/salary/Facebook`)
        .then(res => {
          //console.log(res)
            if(res.status === 200){
                if(res.data){
                  this.props.getSalaryDetails(res.data)
                   console.log(this.props.salary)
                    //this.props.saveEvents(res.data);
                }
            }
        })
};


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
      sql_student_id: localStorage.getItem("sql_student_id"),
      company: this.state.company,
      base_salary: this.state.base_salary,
      currancy: this.state.currancy,
      bonus: this.state.bonus,
      job_title: this.state.job_title,
      year_of_experience: this.state.year_of_experience,
      location: this.state.location,
    };
    console.log(salaryData);
    this.props.insertNewSalaryDetails(salaryData);
    if(this.props.status === "Inserted Successfully"){
      this.hideModal()
    }
  }
   
 
   
  render() {
    return (
        <Container className="mt-5 mb-5">                                           
                    <Row>
        <Navbar />             
        <Col sm={8} md={8} lg={8}>
              <h4 style={{ color: '#3BB143', float: 'left' }}>Salary range of all the job title</h4>
              <br />
              <React.Fragment>
              <div className="w-100 bg-light text-dark mt-5 p-5 shadow rounded">
                <SalaryList salaryList = { this.props.salary } ></SalaryList>   
                </div>
                </React.Fragment>
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
                   Currency*
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='currancy'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                <Form.Label>
                    Bonus
                  </Form.Label>
                  <Form.Control
                    type='number'
                    name='bonus'
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
                    name='year_of_experience'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group> 
                  <Form.Label>
                    Location*
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='location'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                  <ButtonGroup aria-label='First group' className='mt-2'>
                  <Button variant='primary' type='submit'>
                    Submit
                  </Button>
                </ButtonGroup>
              </Form>
          </Modal.Body>
          <Modal.Footer>
         
        </Modal.Footer>
        </Modal>

        <Button variant="primary"onClick={this.showModal}>+ Add Salary</Button>
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
  salary: state.salary,
  status: state.salary.status
});
const mapDispatchToProps = (dispatch) => {
  return {
    getSalaryDetails: (data) => dispatch(getSalaryDetails(data)),
    insertNewSalaryDetails: (data) => dispatch(insertNewSalaryDetails(data)),
      
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddSalary);
