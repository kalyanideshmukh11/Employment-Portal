import React, {Component} from 'react';
import {Image, ListGroup} from 'react-bootstrap'
import profilePicture from '../images/studentPlaceholder.png'


class SideBarStudent extends Component {
    constructor(props){
        super(props)
        this.state = {
            profileState: false,
            resumeState: false,
            jobPreferenceState: false,
            demographicsState: false
        }
        
    }
    componentWillMount = () => {
        if(localStorage.getItem('active-list') === 'profile') {
            this.setState({profileState: true})
        } else if(localStorage.getItem('active-list') === 'resume') {
            this.setState({resumeState: true})
        }
        else if(localStorage.getItem('active-list') === 'jobPreference') {
            this.setState({jobPreferenceState: true})
        }
        else if(localStorage.getItem('active-list') === 'demographics') {
            this.setState({demographicsState: true})
        }
    }
    render() {
        return (
            <div>
            <Image src={profilePicture} style={{width:"1.5cm"}} roundedCircle />
                    <br />
                    <br />
                    <ListGroup variant='flush' >
                        <ListGroup.Item action variant='light'
                        active={this.state.profileState}
                        onClick={()=>{localStorage.setItem('active-list', 'profile')}}
                        style={{color:"black"}}
                        href='/student/profile'>
                        Profile
                        </ListGroup.Item>
                        <ListGroup.Item action variant='light'
                        active={this.state.resumeState}
                        onClick={()=>{localStorage.setItem('active-list', 'resume')}}
                        style={{color:"black"}}
                        href='/student/resume'>
                        Resume
                        </ListGroup.Item>
                        <ListGroup.Item action variant='light' 
                        active={this.state.jobPreferenceState}
                        onClick={()=>{localStorage.setItem('active-list', 'jobPreference')}}
                        style={{color:"black"}}
                        href='/student/jobPreference'>
                        Job Preference
                        </ListGroup.Item>
                        <ListGroup.Item action variant='light' 
                        active={this.state.demographicsState}
                        onClick={()=>{localStorage.setItem('active-list', 'demographics')}}
                        style={{color:"black"}}
                        href='/student/demographics'>
                        Demographics
                        </ListGroup.Item>
                    </ListGroup>

                    </div>
        ) 
    }
}

export default SideBarStudent