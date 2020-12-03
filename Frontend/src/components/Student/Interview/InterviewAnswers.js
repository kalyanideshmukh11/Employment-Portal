import React, { Component } from 'react';
import StudentNavbar from '../Navbar/navbar_student';
import CompanyOverviewTab from '../Tabs/homeTabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import backendServer from '../../../webConfig';
import { Link } from 'react-router-dom';

class InterviewAnswers extends Component {
  /*componentDidMount() {
    axios
      .get(
        `${backendServer}student/interview/get/${this.props.location.state.id}`
      )
      .then((response) => {
        if (response.data) {
          this.setState({
            interviews: response.data,
          });
        }
      })
      .catch((error) => {
        console.log('Error');
        console.log(error);
      });
  }*/

  render() {
    let qaTag = null;
    let qTag = null;
    let ansTag = null;
    if (this.props && this.props.state) {
      console.log('HERERERERER');
      qTag = (
        <Card style={{ width: '22cm' }}>
          <Card.Title
            style={{
              padding: '30px 20px 0px 20px',
              fontSize: '25px',
            }}
          >
            Interview Question
          </Card.Title>
          <Card.Body>
            <Card.Text style={{ color: '#49504C' }}>
              {this.props.state.job_title} Interview
            </Card.Text>
            <Card.Text style={{ color: '#49504C' }}>
              <em>"{this.props.state.question}"</em>
            </Card.Text>
          </Card.Body>
        </Card>
      );
      qaTag = this.props.state.answers.map((ans) => {
        return <Card.Text style={{ color: '#49504C' }}>{ans.answer}</Card.Text>;
      });

      ansTag = (
        <Card style={{ width: '22cm' }}>
          <Card.Title
            style={{
              padding: '30px 20px 0px 20px',
              fontSize: '25px',
            }}
          >
            Interview Answer
          </Card.Title>
          <Card.Body>
            <Card.Text style={{ color: '#7f7f7f', fontWeight: 'normal' }}>
              {this.props.state.ansCountString}
            </Card.Text>
            {qaTag}
          </Card.Body>
        </Card>
      );
    }
    return (
      <div>
        <div style={{ margin: 'auto', width: '50%' }}>
          <div>
            {qTag}
            <br />
            {ansTag}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default InterviewAnswers;
