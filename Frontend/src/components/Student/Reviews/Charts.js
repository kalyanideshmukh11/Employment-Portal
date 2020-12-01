import React from 'react';
import { Card, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

export const Charts = (props) => {  
    let reviewList = props.charts[0];
    console.log("Inside charts")
    console.log(reviewList) 
    if(reviewList){
      const  createElements=(n) => {
        var elements = [];
        for (let i = 0; i < n; i++) {
          elements.push(
            <i className='fa fa-star' aria-hidden='true' style={{ color: 'green' }}></i>,
          );
        }
        return elements;
      } 
      const  rec = {
        title: "Recommend to a Friend",
        dataDoughnut: {
          datasets: [
            {
              data: [reviewList.recommended,reviewList.recommended],
              backgroundColor: ["#008000", "#DCDCDC"],
            }
          ]
        }
      }
      const  ceo = {
        title: "Recommend to a Friend",
        dataDoughnut: {
          datasets: [
            {
              data: [reviewList.ceoRating,reviewList.ceoRating],
              backgroundColor: ["#008000", "#DCDCDC"],
            }
          ]
        }
      }

  
    const list = (
        <div>

        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div>
          <p style={{marginLeft: "10px", padding: "25px"}}>{reviewList.avgRating}.0 {createElements(4)}</p>
          <p style={{fontWeight: "light",fontSize: "15px", marginLeft: "0px", padding: "60px"}}>Overall Rating</p>
          </div>
          <div>
          <MDBContainer>
          <Doughnut data={rec.dataDoughnut}  />
          <p style={{fontWeight: "light",fontSize: "15px", marginLeft: "60px",  padding: "0px"}}>Recommend to a Friend</p>
        </MDBContainer>
        </div>
        <div>
          <MDBContainer>
          <Doughnut data={ceo.dataDoughnut}  />
          <p style={{fontWeight: "light",fontSize: "15px", marginLeft: "90px",  padding: "0px"}}>Approve of CEO</p>
        </MDBContainer>
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
else{
    return(
        <div>
            <p>charts progressing</p>
        </div>
    )
}
    
}
