import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'


class AboutMeModalForm extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        const ModalFormContent =
        <Modal 
        show={this.props.aboutMeShow}
        onHide={this.props.aboutMeOnHide}
        backdrop="static"
        keyboard={false}
        centered
        >
        
        <Modal.Header closeButton>
          <Modal.Title>Add About Me</Modal.Title>
        </Modal.Header>
      
        <Modal.Body style={{padding:"10px 30px 10px 30px"}}>
            <Form>
            <Form.Label>Description</Form.Label>
            <Form.Control as='textarea' placeholder="About Me" rows={10} />

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

export default AboutMeModalForm