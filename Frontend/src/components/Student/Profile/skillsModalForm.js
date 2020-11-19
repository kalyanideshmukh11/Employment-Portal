import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'


class SkillsModalForm extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        const ModalFormContent =
        <Modal 
        show={this.props.skillsShow}
        onHide={this.props.skillsOnHide}
        backdrop="static"
        keyboard={false}
        centered
        >
        
        <Modal.Header closeButton>
          <Modal.Title>Add Skills</Modal.Title>
        </Modal.Header>
      
        <Modal.Body style={{padding:"10px 30px 10px 30px"}}>
            <Form>
            <Form.Control type='Text' placeholder="Enter a skill (Ex. MERN stack)"  />
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

export default SkillsModalForm