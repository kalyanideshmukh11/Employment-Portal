import React, {Component} from 'react';
import ContributionsSidebar from '../Navbar/contributions_sideBar'
import StudentNavbar from '../Navbar/navbar_student'
import {Button, Card, Table} from 'react-bootstrap'

class PhotosContribution extends Component{
 constructor(props){
     super(props)
         this.state = {

     }
 }
 render(){
     return(
        <div>
            <StudentNavbar />
       
        <div className='row' style={{background: "#eaeaea"}}>
        <div className="col-4 contri" style={{paddingLeft:"5cm"}}> 
        <ContributionsSidebar />
        </div>
        <div className="col-8 contri" style={{padding:"28px 20px 0px 20px"}}>  
        <Card style={{ width: '44rem', padding:"10px 20px 0px 10px" }}>
        <Card.Body>
            <Card.Title>
                Photos
            </Card.Title>
            
                <Card.Text>
                    <Button style={{backgroundColor: '#1861bf', borderColor: "#1861bf"}} href=''>
                        Add Photos
                    </Button>
                </Card.Text>
                <br />
                <Card.Text>
                The Glassdoor team reviews every piece of content submitted by users, so please be patient. 
                Contributions with the 'Pending' status are being reviewed, and will appear on the site once they are approved.

                </Card.Text>
                <Card.Text>
                    <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th style={{width:"50%", padding:"10px 0px 10px 10px"}}>Details</th>
                        <th style={{padding:"10px 0px 10px 10px"}}>Submitted</th>
                        <th style={{padding:"10px 0px 10px 10px"}}>Status</th>

                        </tr>
                    </thead>
                    </Table>
                </Card.Text>

            </Card.Body>
            
            </Card>               
            
        
    </div>
    </div>
    </div>
     )
 }
}
export default PhotosContribution