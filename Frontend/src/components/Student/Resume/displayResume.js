import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { Dropdown, Button } from 'react-bootstrap';
import axios from 'axios';
import backendServer from "../../../webConfig"
import { Document, pdfjs, Page } from 'react-pdf';
import pdf from './resume.pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


class ResumeDisplay extends Component{
    constructor(props){
        super(props)
        this.state= {
            dropdownOpen: false,
            data: this.props.resumes,
        }
        this.toggle = this.toggle.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }
    
    toggle = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }
    
      onMouseEnter = () => {
        this.setState({dropdownOpen: true});
      }
    
      onMouseLeave = () => {
        this.setState({dropdownOpen: false});
      }

      markAsPrimary = () => {
          const resume_data = this.state.data
          axios.post(`${backendServer}student/markPrimaryResume/${localStorage.getItem("sql_student_id")}`, resume_data,
          {headers: { Authorization: `${localStorage.getItem("token")}` }
          })
          .then(response => {
              this.setState({
                  status: response.data,
                  server_status: response.status
              })
    
          })
      }

      deleteResume = () => {
        const resume_data = this.state.data
        axios.post(`${backendServer}student/deleteResume/${localStorage.getItem("sql_student_id")}`, resume_data,
        {headers: { Authorization: `${localStorage.getItem("token")}` }
        })
        .then(response => {
            this.setState({
                status2: response.data,
                server_status2: response.status
            })
  
        })
      }

      openResume = () => {
          const resume_data = this.state.data
          axios.post(`${backendServer}student/openResume/`, resume_data)
          .then(response => {
            var file = new Blob([response.data], {type: 'application/pdf'});
            var len = response.data.length;
            var bytes = new Uint8Array( len );
            for (var i = 0; i < len; i++){
                bytes[i] = response.data.charCodeAt(i);
            }
            console.log(bytes)
            let fileUrl = URL.createObjectURL(file);
            console.log(fileUrl)
            var pdf_file = {
                url: fileUrl,
                data: bytes.buffer
            }
            this.setState({
                file_name: pdf_file
            })
          })          
      }

    render(){
        // console.log(this.state.file_name)    
        let error = {
            message: null
        }
        let success = {
            message: null
        }
        if(this.state.status === 'CHANGES_SAVED'){
            success.message = "Successfully marked the resume as primary."
            setTimeout(function() {window.location = '/student/resume'}, 500);
        } else if(this.state.server_status === 500){
            error.message = "Unable to mark the resume as primary."
            setTimeout(function() {window.location = '/student/resume'}, 2000);
        }
        if(this.state.status2 === 'CHANGES_SAVED'){
            success.message = "Successfully deleted the resume."
            setTimeout(function() {window.location = '/student/resume'}, 500);
        } else if(this.state.server_status2 === 500){
            error.message = "Unable to delete the resume."
            setTimeout(function() {window.location = '/student/resume'}, 2000);
        }
        let markPrimary, primary_tag = null
        if(this.props.resumes.is_primary === true){
            primary_tag = (<i style={{fontWeight: '400', fontSize:"13px", color: '#778899'}}>(primary)</i>)
            markPrimary = (<Dropdown.Item onClick={this.markAsPrimary} disabled>Mark as primary</Dropdown.Item>)
        } else {
            primary_tag = null
            markPrimary = (<Dropdown.Item onClick={this.markAsPrimary}>Mark as primary</Dropdown.Item>)
        }
        return(
            <div>
            <div class='row'>
                <div class='col-9'>
                    <Button variant='link'
                    onClick={this.openResume} style={{textDecoration: 'none'}}>
                    <span style={{fontSize: "1.08rem", fontWeight: "420"}}> {this.props.resumes.resume.split("!%%%!")[1]}  </span>
                    </Button> {primary_tag}
                </div>
                <div class='col-3'>
                <Dropdown onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} show={this.state.dropdownOpen} toggle={this.toggle} style={{float: 'right', marginRight: "2mm"}}>
                <Dropdown.Toggle variant='link' style={{color: "black"}}>
                <FontAwesomeIcon icon={faEllipsisV} color='gray'/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {markPrimary}
                <Dropdown.Divider/>
                <Dropdown.Item onClick={this.deleteResume}><FontAwesomeIcon icon={faTrash} style={{color: '#ff726f', marginLeft:'2.7cm'}}/></Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
                </div>

        {/* <Document
            file={this.state.file_name}
            >
            <Page pageNumber={1} />
                </Document> */}
        </div>

            <div>
            {error.message && <div style={{width: '80%', margin:"0 auto", marginBottom:"5mm", textAlign: 'center', padding: "10px 10px 10px 10px"}} className='alert alert-danger'>{error.message}</div>}
            {success.message && <div style={{width: '80%', margin:"0 auto", marginBottom:"5mm", textAlign: 'center', padding: "10px 10px 10px 10px"}} className='alert alert-success'>{success.message}</div>}
            </div>
            <hr />
            </div>
           
        )
    }
}

export default ResumeDisplay