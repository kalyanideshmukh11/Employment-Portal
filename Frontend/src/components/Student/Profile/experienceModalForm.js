import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';


class ExperienceModalForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            monthOptions: [{value: 'January'},
            {value: 'February'},
            {value: 'March'},
            {value: 'April'},
            {value: 'May'},
            {value: 'June'},
            {value: 'July'},
            {value: 'August'},
            {value: 'September'},
            {value: 'October'},
            {value: 'November'},
            {value: 'December'},]

        }
    }

    render(){
        const ModalFormContent =
        <Modal 
        show={this.props.experienceShow}
        onHide={this.props.experienceOnHide}
        backdrop="static"
        keyboard={false}
        centered
        >
        
        <Modal.Header closeButton>
          <Modal.Title>Add Experience</Modal.Title>
        </Modal.Header>
      
        <Modal.Body style={{padding:"10px 30px 10px 30px"}}>
            <Form>
            <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type='text' placeholder="Title" />
            </Form.Group>

            <Form.Group>
            <Form.Label>Company Name</Form.Label>
            <Form.Control type='text' placeholder="Name" />
            </Form.Group>

            <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control type='text' placeholder="Location" />
            </Form.Group>

            <div class='row'>
                <div class='col-4'>
                    <Form.Group>
                    <Form.Label>Start Month</Form.Label>
                    <Dropdown 
                    placeholder='Month'
                    options = {this.state.monthOptions}
                    />
                    </Form.Group>

                </div>
                <div class='col-4'>
                    <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Form.Control type='text' placeholder='Year' />
                    </Form.Group>
       
                </div>
            </div>

            <div class='row'>
                <div class='col-4'>
                    <Form.Group>
                    <Form.Label>End Month</Form.Label>
                    <Dropdown 
                    placeholder='Month'
                    options = {this.state.monthOptions}
                    />
                    </Form.Group>

                </div>
                <div class='col-4'>
                    <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Form.Control type='text' placeholder='Year' />
                    </Form.Group>
       
                </div>
            </div>

            <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as='textarea' placeholder="Description" rows={5} />
            </Form.Group>

            </Form>

        </Modal.Body>
      
        <Modal.Footer>   
          <Button variant='success'>Save changes</Button>
        </Modal.Footer>
     
      </Modal>;
        return (
          <div>
            {ModalFormContent}
          </div>
        )
    }
}

export default ExperienceModalForm