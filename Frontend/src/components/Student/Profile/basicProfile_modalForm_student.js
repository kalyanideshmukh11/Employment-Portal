import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap'


class BasicProfileModal extends Component{
    constructor(props){
        super(props)
        this.state = {
            show: false,
            setShow: true
        }
    }
    render(){
        // handleClose = () => this.setState({setShow: false});
        // handleShow = () => this.setState({setShow: true});
        console.log(this.state.setShow)
        return(
            <div>
                <Modal show={this.state.show} onHide={this.state.setShow}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.state.setShow}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={this.state.setShow}>
                    Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default BasicProfileModal