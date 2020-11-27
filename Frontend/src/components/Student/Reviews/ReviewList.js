
import React from 'react';
import { Card, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';


export const ReviewList = (props) => {   
  const  createElements=(n) => {
        var elements = [];
        for (let i = 0; i < n; i++) {
          elements.push(
            <i className='fa fa-star' aria-hidden='true' style={{ color: 'green' }}></i>,
          );
        }
        return elements;
      } 
    let reviewList = props.reviewList.reviews;
    console.log(reviewList)
    const list = Object.keys(reviewList).map(key =>
        <div>
                <hr />  
                    <p style={{marginLeft: "10px", fontSize: "20px", color:"#1355a9",fontWeight: "bold"}}>"{reviewList[key].headline}"</p>
                    <p style={{marginLeft: "10px"}}>{reviewList[key].rating}.0 {createElements(reviewList[key].rating)}</p>
                     <p style={{marginLeft: "10px"}}> {reviewList[key].description}</p>
                    <p style={{fontWeight: "bold", marginLeft: "10px",  padding: "0px"}}>Pros</p>
                    <p style={{marginLeft: "10px"}}>{reviewList[key].pros}</p>
                    <p style={{fontWeight: "bold", marginLeft: "10px"}}>Cons</p>
                    <p style={{marginLeft: "10px"}}>{reviewList[key].cons}</p>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div>
                             </div>
                        <div>
                            <Button style={{backgroundColor: "transparent", bordercolor: "DodgerBlue",hoverbackground:"DodgerBlue", color: "#1355a9", fontSize: "15px"}}>Helpful({reviewList[key].helpful})</Button>
                        </div>
                    </div>
            </div>

    );
    return (
        <div>
            {list}
        </div>
    );  
}
