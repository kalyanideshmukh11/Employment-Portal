import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'


class BasicProfileModal extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        const ModalFormContent =
        <Modal 
        show={this.props.show}
        onHide={this.props.onHide}
        backdrop="static"
        keyboard={false}
        centered
        >
        
        <Modal.Header closeButton>
          <Modal.Title>Add Basic Profile</Modal.Title>
        </Modal.Header>
      
        <Modal.Body style={{padding:"10px 30px 10px 30px"}}>
            <Form>
                <div class ='row'>
                    <div className='col-6'>
                    <Form.Group controlId="formBasicEmail">
                    < Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First name" />
                    </Form.Group>
                    </div>
                    <div className='col-6'>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last name" />
                    </Form.Group>
                    </div>
                </div>


                <Form.Group controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Job title" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Location" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Email address" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Address" />
                </Form.Group>

                <div class='row'>
                    <div class='col-4'>
                    <Form.Group controlId="formBasicEmail">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="City" />
                </Form.Group>
                    </div>

                    <div class='col-4'>
                    <Form.Group controlId="formBasicEmail">
                <Form.Label>State</Form.Label>
                <Form.Control type="email" placeholder="State" />
                </Form.Group>
                    </div>

                    <div class='col-4'>
                    <Form.Group controlId="formBasicEmail">
                <Form.Label>Zip</Form.Label>
                <Form.Control type="text" placeholder="Zipcode" />
                </Form.Group>
                    </div>
                </div>

                <div class='row'>
                    <div class='col-6'>
                    <Form.Group controlId="formBasicEmail">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="email" placeholder="Phone" />
                </Form.Group>
                    </div>

                    <div class='col-6'>
                    <Form.Group controlId="formBasicEmail">
                <Form.Label>Website</Form.Label>
                <Form.Control type="text" placeholder="Website" />
                </Form.Group>
                    </div>
                </div>



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

export default BasicProfileModal