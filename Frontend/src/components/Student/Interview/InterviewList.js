import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { Card, Col } from 'react-bootstrap';
import axios from 'axios';
import backendServer from '../../../webConfig';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';

class InterviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job_title: '',
      description: '',
      difficulty: '',
      offer_status: '',
      interview_q_a: [],
      interview_date: '',
    };
  }

  componentDidMount() {
    console.log(this.props.id)
    axios
      .get(`${backendServer}student/interview/get/${this.props.id}`)
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
  }

  getDifficultyString(difficulty) {
    switch (difficulty) {
      case 1:
        return 'Very Easy';
      case 2:
        return 'Easy';
      case 3:
        return 'Average';
      case 4:
      case 5:
        return 'Difficult';
      default:
        return '';
    }
  }

  getDifficultyColor(difficulty) {
    switch (difficulty) {
      case 1:
      case 2:
        return '#0caa41';
      case 3:
        return '#f6b500';
      case 4:
      case 5:
        return '#eb4133';
      default:
        return '';
    }
  }

  getOfferColor(offer) {
    if (offer === 'No') {
      return '#eb4133';
    } else if (offer === 'Yes, and I accepted') {
      return '#0caa41';
    } else {
      return '#f6b500';
    }
  }

  getOfferString(offer) {
    if (offer === 'No') {
      return 'No Offer';
    } else if (offer === 'Yes, and I accepted') {
      return 'Accepted Offer';
    } else {
      return 'Declined Offer';
    }
  }

  getExpColor(exp) {
    if (exp === 'Negative') {
      return '#eb4133';
    } else if (exp === 'Positive') {
      return '#0caa41';
    } else {
      return '#f6b500';
    }
  }

  calculateExp(interviews) {
    let data = [];
    let positive = 0;
    let negative = 0;
    let neutral = 0;
    if (interviews.length > 0) {
      for (let i = 0; i < interviews.length; i++) {
        if (interviews[i].overall_experience === 'Positive') {
          positive++;
        } else if (interviews[i].overall_experience === 'Negative') {
          negative++;
        } else {
          neutral++;
        }
      }
      data.push(((positive * 100) / interviews.length).toFixed(2));
      data.push(((neutral * 100) / interviews.length).toFixed(2));
      data.push(((negative * 100) / interviews.length).toFixed(2));
    }
    return data;
  }

  getDifficultyAverage(interviews) {
    let sum = 0.0;
    for (let i = 0; i < interviews.length; i++) {
      sum += interviews[i].difficulty;
    }
    return sum / interviews.length;
  }

  getDifficultyAverageColor(avg) {
    let colors = ['#f1f2f2', '#f1f2f2', '#f1f2f2', '#f1f2f2', '#f1f2f2'];
    for (let i = 0; i < Math.round(avg); i++) {
      colors[i] = '#0caa41';
    }
    return colors;
  }

  render() {
    //console.log('this.props.location.state');
    //console.log(this.props.location.state);
    console.log('this.props');
    console.log(this.props);
    let interviewTag = null;
    let data = [];
    let avgDifficulty = 0;
    let avgDifficultyColor = [
      '#f1f2f2',
      '#f1f2f2',
      '#f1f2f2',
      '#f1f2f2',
      '#f1f2f2',
    ];
    if (this.state && this.state.interviews) {
      console.log('interviews');
      console.log(this.state.interviews);

      let d = this.calculateExp(this.state.interviews);
      avgDifficulty = this.getDifficultyAverage(this.state.interviews);
      avgDifficulty = avgDifficulty.toFixed(2);
      avgDifficultyColor = this.getDifficultyAverageColor(avgDifficulty);
      let l = [];
      if (d.length > 0) {
        l.push('Positive ' + d[0] + '%');
        l.push('Neutral ' + d[1] + '%');
        l.push('Negative ' + d[2] + '%');
      }
      data = {
        datasets: [
          {
            data: d,
            backgroundColor: ['#93da67', '#0caa41', '#194383'],
          },
        ],
        labels: l,
      };
      interviewTag = this.state.interviews.map((interviewCard) => {
        let que_tag = interviewCard.interview_q_a.map((que) => {
          let ansCount = 0;
          let ansTag = null;
          if (que.answers) {
            console.log(que.answers.length);
            ansCount = que.answers.length;
          }

          console.log(ansCount);
          if (ansCount > 0) {
            ansTag = ansCount + ' Answer';
          } else {
            ansTag = 'Answer Question';
          }
          if (ansCount > 1) {
            ansTag = ansTag + 's';
          }
          return (
            <div>
              <Card.Text style={{ color: '#49504C' }}>{que.question}</Card.Text>
              {/*<Link
                to={{
                  pathname: '/student/interview/answers',
                  state: {
                    job_title: interviewCard.job_title,
                    question: que.question,
                    answers: que.answers,
                    ansCountString: ansTag,
                  },
                }}
              >*/}
              <Link
                to={{
                  pathname: '/student/tabs',
                  companyName: interviewCard.companyName,
                  companyID: interviewCard.sql_company_id,
                  category: 'answers',
                  state: {
                    job_title: interviewCard.job_title,
                    question: que.question,
                    answers: que.answers,
                    ansCountString: ansTag,
                  },
                }}
              >
                <Card.Text style={{ color: '#1861bf' }}>{ansTag}</Card.Text>
              </Link>
            </div>
          );
        });
        let offerColor = this.getOfferColor(interviewCard.offer_status);
        let offerString = this.getOfferString(interviewCard.offer_status);
        let expColor = this.getExpColor(interviewCard.overall_experience);
        let difficultyColor = this.getDifficultyColor(interviewCard.difficulty);
        let difficultyString = this.getDifficultyString(
          interviewCard.difficulty
        );
        return (
          <Card style={{ width: '22cm' }}>
            <Card.Title
              style={{
                padding: '30px 20px 0px 20px',
                fontSize: '25px',
                color: '#1861bf',
              }}
            >
              {interviewCard.job_title} Interview
            </Card.Title>
            <Card.Body>
              <Card.Text style={{ color: '#49504C' }}>
                <div className='d-flex flex-row'>
                  <div class='col col-md-4'>
                    <div style={{ marginTop: '1.75mm' }}>
                      <FontAwesomeIcon
                        icon={faSquare}
                        style={{ color: expColor }}
                      />
                      <span style={{ marginLeft: '1mm' }}>
                        {interviewCard.overall_experience} Experience
                      </span>
                    </div>
                  </div>
                  <div class='col col-md-4'>
                    <div style={{ marginTop: '1.75mm' }}>
                      <FontAwesomeIcon
                        icon={faSquare}
                        style={{ color: difficultyColor }}
                      />
                      <span style={{ marginLeft: '1mm' }}>
                        {difficultyString}
                      </span>
                    </div>
                  </div>
                  <div class='col col-md-4'>
                    <div style={{ marginTop: '1.75mm' }}>
                      <FontAwesomeIcon
                        icon={faSquare}
                        style={{ color: offerColor }}
                      />
                      <span style={{ marginLeft: '1mm' }}>{offerString}</span>
                    </div>
                  </div>
                </div>
              </Card.Text>
              <br />
              <Card.Text style={{ fontWeight: 'bold', color: '#49504C' }}>
                Interview
              </Card.Text>
              <Card.Text style={{ color: '#49504C' }}>
                {interviewCard.description}
              </Card.Text>
              <br />
              <Card.Text style={{ fontWeight: 'bold', color: '#49504C' }}>
                Interview Questions
              </Card.Text>
              {que_tag}
              <br />

              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        );
      });
    }
    console.log('datatatata');
    console.log(data);

    const options = {
      weight: '0.2',
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        position: 'right',
      },
    };
    return (
      <div>
        <div style={{ margin: 'auto', width: '50%' }}>
          <Card style={{ width: '22cm' }}>
            <br />

            <Col sm={4} md={4} lg={4}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <MDBContainer>
                    <p
                      style={{
                        fontWeight: 'bold',
                        fontSize: '15px',
                        marginLeft: '40px',
                        padding: '0px',
                      }}
                    >
                      Experience
                    </p>
                    <Doughnut data={data} options={options} />
                  </MDBContainer>
                </div>
                <div
                  className='d-flex flex-row'
                  style={{ marginLeft: '200px' }}
                >
                  <div style={{ marginRight: '20px', marginTop: '35px' }}>
                    <p
                      style={{
                        fontWeight: 'normal',
                        fontSize: '50px',
                        marginLeft: '32px',
                      }}
                    >
                      {avgDifficulty}
                    </p>
                    <h3>Average</h3>
                  </div>
                  <div>
                    <MDBContainer>
                      <div>
                        <p
                          style={{
                            fontWeight: 'bold',
                            fontSize: '15px',
                            padding: '0px',
                          }}
                        >
                          Difficulty
                        </p>
                        <div
                          className='d-flex flex-row'
                          style={{ marginTop: '1.75mm' }}
                        >
                          <FontAwesomeIcon
                            icon={faSquare}
                            style={{
                              color: avgDifficultyColor[4],
                              marginTop: '1.74mm',
                            }}
                          />
                          <span style={{ marginLeft: '1mm' }}>Hard</span>
                        </div>

                        <div
                          className='d-flex flex-row'
                          style={{ marginTop: '1.75mm' }}
                        >
                          <FontAwesomeIcon
                            icon={faSquare}
                            style={{
                              color: avgDifficultyColor[3],
                              marginTop: '1.74mm',
                            }}
                          />
                        </div>

                        <div
                          className='d-flex flex-row'
                          style={{ marginTop: '1.75mm' }}
                        >
                          <FontAwesomeIcon
                            icon={faSquare}
                            style={{
                              color: avgDifficultyColor[2],
                              marginTop: '1.72mm',
                            }}
                          />
                          <span style={{ marginLeft: '1mm' }}>Average</span>
                        </div>
                        <div
                          className='d-flex flex-row'
                          style={{ marginTop: '1.75mm' }}
                        >
                          <FontAwesomeIcon
                            icon={faSquare}
                            style={{
                              color: avgDifficultyColor[1],
                              marginTop: '1.72mm',
                            }}
                          />
                        </div>
                        <div
                          className='d-flex flex-row'
                          style={{ marginTop: '1.75mm' }}
                        >
                          <FontAwesomeIcon
                            icon={faSquare}
                            style={{
                              color: avgDifficultyColor[0],
                              marginTop: '1.73mm',
                            }}
                          />
                          <span style={{ marginLeft: '1mm' }}>Easy</span>
                        </div>
                      </div>
                    </MDBContainer>
                  </div>
                </div>
              </div>
            </Col>
            <br />
          </Card>
          <div>
            {interviewTag}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default InterviewList;
