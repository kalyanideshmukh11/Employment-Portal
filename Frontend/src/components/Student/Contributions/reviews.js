import React, {Component} from 'react';
import ContributionsSidebar from '../Navbar/contributions_sideBar'
import StudentNavbar from '../Navbar/navbar_student'
import {Button, Card, Table} from 'react-bootstrap'
import axios from 'axios'
import backendServer from "../../../webConfig"
import StarRatings from 'react-star-ratings';

class ReviewContribution extends Component{
 constructor(props){
     super(props)
         this.state = {
            company_reviews: []
     }
 }
 componentWillMount = () => {
    axios.get(`${backendServer}student/studentReviews/${localStorage.getItem("sql_student_id")}`,
    {headers: { Authorization: `${localStorage.getItem("token")}` }
    })
    .then(response => {
        this.setState({
            company_reviews: this.state.company_reviews.concat(response.data) ,
        })

    })

 }
 render(){
     let details= null;
     if(this.state.company_reviews.length > 0){
        details = this.state.company_reviews.map(reviews => {
            return(
                <tr>
                    <td>{
                        <div>
                        <span style={{fontWeight: '600', fontSize: "15px", padding:"20px 10px 10px 10px"}}>{reviews.job_title}</span> <br />
                    <span style={{fontSize: '15px', fontWeight: '500', padding:"20px 10px 10px 10px"}}>{reviews.company} </span>
                    <p style={{padding: "20px 10px 10px 10px"}}> <span style={{fontWeight: "600"}}><a href='' style={{textDecoration: 'none'}}> "{reviews.headline}" </a></span>  
                    <span> 
                        <div class='row'>
                            <div class='col-3.5' style={{marginTop: "0.60mm", marginLeft: '25px'}}> Rating:  </div>
                            <div class='col-5'><StarRatings rating={reviews.rating} style={{display: 'none !important'}}
                        starRatedColor="green" numberOfStars={5} starDimension="17px"
                        starSpacing="1px"/></div>
                        </div></span></p>
                        <p style={{padding: "0px 10px 10px 10px"}}>
                            {reviews.description}
                        </p>
                        <span style={{padding: "20px 0px 0px 10px", fontWeight: "600"}}> Pros: </span> <br />
                        <li style={{marginLeft:"3mm", padding:"0px 0px 10px 10px"}}> <span style={{fontWeight: "400", left:"-10px", position:"relative"}}>
                        {reviews.pros} </span> </li>
                       

                        <p>
                        <span style={{padding: "20px 0px 0px 10px", fontWeight: "600"}}> Cons: </span> <br />
                        <li style={{marginLeft:"3mm", padding:"0px 0px 0px 10px"}}> <span style={{fontWeight: "400", left:"-10px", position:"relative"}}>
                        {reviews.cons} </span> </li>

                        </p>
                        </div>}</td>
    
                    <td style={{textAlign: "center", verticalAlign:"middle"}}>{reviews.date.split('T')[0]}</td>
                    
                    <td style={{textAlign: "center", verticalAlign:"middle", fontWeight: "600"}}>{reviews.approvedstatus}</td>

                    
                </tr>
            )
        })
     } else {
         details = (
         <tr>
            <td colSpan="2" style={{padding: "10px 10px 10px 10px", color:"#33333", verticalAlign:"middle"}}> Please add your interview experiences to show it here.</td>
         </tr>)
         }
     return(
        <div>
            <StudentNavbar />
       
        <div className='row' style={{background: "#eaeaea"}}>
        <div className="col-4 contri" style={{paddingLeft:"5cm"}}> 
        <ContributionsSidebar />
        </div>
        <div className="col-8 contri" style={{padding:"28px 20px 0px 20px"}}>  
        <Card  style={{ width: '44rem', padding:"10px 20px 0px 10px" }}>
        <Card.Body>
            <Card.Title>
                Reviews
            </Card.Title>
            
                <Card.Text>
                    <Button style={{backgroundColor: '#1861bf', borderColor: "#1861bf"}} href=''>
                        Write a Review
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
                        <th style={{width:"60%", padding:"10px 0px 10px 10px"}}>Details</th>
                        <th style={{padding:"10px 0px 10px 10px"}}>Submitted</th>
                        <th style={{padding:"10px 0px 10px 10px"}}>Review Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {details}
                    </tbody>
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
export default ReviewContribution