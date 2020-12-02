import Navigationbar from '../../Student/Navbar/navbar_student';
import React, { Component } from 'react';
import { CardImg, Button } from 'react-bootstrap';
import Comp from '../component';

class HomeTabs extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   // user: {},
    //   // buttontxt: ' Review',
    //   loadComponent: ,
    // };
    this.loadComp = this.loadComp.bind(this);
    console.log('props:', this.props);
    if (
      this.props.location.category &&
      this.props.location.category === 'overview'
    ) {
      console.log('in if condition');
      this.state = {
        loadComponent: <Comp str='This is Overview'></Comp>,
      };
      // this.setState({
      //   loadComponent: <Comp str='This is Overview'></Comp>,
      // });
      // this.loadComp(<Comp str='This is Overview'></Comp>);
    } else {
      this.state = {
        loadComponent: <Comp str='This is Overview'></Comp>,
      };
    }
  }

  componentWillReceiveProps(nextProp) {
    console.log('Received: ', nextProp);
  }
  loadComp(param) {
    console.log('Button clicked', param);
    this.setState({ loadComponent: param });
    this.forceUpdate();
  }
  // componentWillMount() {
  //     axios.get(`${backendServer}company/profile/${localStorage.getItem("sql_company_id")}`)
  //     .then(res => {
  //         this.setState({ user: res.data });
  //     });
  // }

  render() {
    // console.log(this.state.user);
    // console.log(this.props.user);
    // var fileName = this.state.user.cphoto_file_name;
    // var imgSrc = `${backendServer}company/imageUpload/${fileName}`;
    return (
      <React.Fragment>
        <Navigationbar />
        <div style={{ margin: '5px' }}>
          <div class='jumbotron' style={{ paddingBottom: '0px' }}>
            <div class='row'>
              <div
                class='col-xs-3 card profilePic'
                style={{ position: 'absolute' }}
              >
                <card>
                  <CardImg
                    style={{ height: '200px', width: '175px' }}
                    // src={imgSrc}
                    className='profileImg'
                  />
                </card>
              </div>
              <div class='col-xs-4 profileName' style={{ marginLeft: '200px' }}>
                <h1>
                  <b>{this.props.location.companyName}</b>
                </h1>

                <br />
                <Button
                  onClick={() =>
                    this.loadComp(<Comp str='This is Overview'></Comp>)
                  }
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Overview{' '}
                </Button>
                <Button
                  onClick={() => this.loadComp(<Comp str='sfsdg'></Comp>)}
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Jobs{' '}
                </Button>
                <Button
                  onClick={() =>
                    this.loadComp(<Comp str='This is reviews'></Comp>)
                  }
                  href=''
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Reviews{' '}
                </Button>
                <Button
                  onClick={() =>
                    this.loadComp(<Comp str='This is Interviews'></Comp>)
                  }
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Interviews{' '}
                </Button>
                <Button
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Salaries{' '}
                </Button>
                <Button
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Photos{' '}
                </Button>
                {/* <Button
                  href='/company/profileUpdate'
                  style={{
                    float: 'right',
                    marginLeft: '500px',
                    backgroundColor: 'green',
                    border: 'green',
                  }}
                >
                  {' '}
                  Add {this.state.buttontxt}
                </Button> */}
              </div>
            </div>
          </div>
          <div class='row' style={{ marginLeft: '10px' }}>
            <div
              class='col-xs-3'
              style={{
                textAlign: 'left',
                height: '100%',
                marginLeft: '40%',
                marginTop: '5%',
              }}
            ></div>
            <hr />
          </div>
        </div>

        {this.state.loadComponent}
      </React.Fragment>
    );
  }
}

export default HomeTabs;
