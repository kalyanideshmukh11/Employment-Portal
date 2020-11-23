import React, { Component } from 'react';
import Navigationbar from './navBar';
import { Redirect } from 'react-router';
//import { Link } from 'react-router-dom';
import { Form, Button} from 'react-bootstrap';
import axios from 'axios';
import backendServer from '../../webConfig';
//import { bindActionCreators } from 'redux';

class updateCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileText: ''
    };
  }
  
  componentWillMount() {
    axios.get(`${backendServer}/yelp/company/${localStorage.getItem("user_id")}`)
    .then(res => {
        this.setState({ user: res.data });
    });
}

onChange= (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}

onImageChange = (e) => {
  if(e.target.files && e.target.files[0]) {
    this.setState({
      file: e.target.files[0],
      fileText: e.target.files[0].name,
    });
  }
}


handleImageUpload = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('image', this.state.file);
  const uploadConfig = {
    headers: {
      'content-type': 'multipart/form-data',
    }
  };
  axios.post(`${backendServer}/yelp/upload/item`, formData, uploadConfig)
  .then(response => {
      alert("Image uploaded successfully!");
      this.setState({
          user_image: response.data
        });
      })
      .catch(err => {
      console.log("Error");
  });
}

handleUpdate = (e) => {
  e.preventDefault();
  const data = {
    name: e.target.name.value,
    street: e.target.street.value,
    city: e.target.city.value,
    zipcode: e.target.zipcode.value,
    email: e.target.email.value,
    contactNo: e.target.contact_info.value,
    timings: e.target.timings.value,
    cuisine: e.target.cuisine.value,
    deliveryMethod: e.target.delivery.value,
    fileName: this.state.fileText
  }
  axios.post(`${backendServer}/yelp/company/update/${localStorage.getItem("user_id")}`, data)
//   this.props.updateRest(data);
};

    render() {
      var redirectVar = null;
      if (this.props.status === 'COMPANY_UPDATED') {
        redirectVar = <Redirect to = '/restaurant' />
      }
      return (
        <React.Fragment>
          {redirectVar}
          <Navigationbar />
          <div class='container'>
            <div class='row'>
              <div class='col-md-6' style={{ marginBottom: '5%' }}>
                <br />
                <h3 style={{ margin: "15px, 0px", color: 'green', float: 'left' }}> Google's Profile</h3>
                <br />
                <hr class='mb-3'></hr>
                <Form onSubmit ={this.handleUpdate}>
                <Form.Group controlId='name'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong >Street</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control name="name" onChange={this.onChange} type='text' />
                </Form.Group>
                <Form.Group controlId='street'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>City</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control name="street" onChange={this.onChange} type='text' />
                </Form.Group>
                <Form.Group controlId='city'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>State</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control name="city" onChange={this.onChange} type='text' />
                </Form.Group>
                <Form.Group controlId='zipcode'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Website</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control name="zipcode" onChange={this.onChange} type='text' />
                </Form.Group>
                <Form.Group controlId='contact'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Company Size</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control name="contact_info" onChange={this.onChange} type='text' />
                </Form.Group>
                <Form.Group controlId='email'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Company Type</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control name="email" onChange={this.onChange} type='text' />
                </Form.Group>
                <Form.Group controlId='nickName'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Revenue</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                  This field is required.
                  </Form.Text>
                  <Form.Control name="timings" onChange={this.onChange} type='text' />
                </Form.Group>
                <Form.Group controlId='cuisine'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Headquarters</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                  This field is required.
                  </Form.Text>
                  <Form.Control name="cuisine" onChange={this.onChange} type='text' />
                </Form.Group>
                <Form.Group controlId='delivery'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Industry</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                  This field is required.
                  </Form.Text>
                  <Form.Control name="delivery" onChange={this.onChange} type='text' />
                </Form.Group>
                <Form.Group controlId='delivery'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Founded</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                  This field is required.
                  </Form.Text>
                  <Form.Control name="delivery" onChange={this.onChange} type='text' />
                </Form.Group>
                <Form.Group controlId='delivery'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Mission</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                  This field is required.
                  </Form.Text>
                  <Form.Control name="delivery" onChange={this.onChange} type='text' />
                </Form.Group>
                <Form.Group controlId='delivery'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>CEO Name</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                  This field is required.
                  </Form.Text>
                  <Form.Control name="delivery" onChange={this.onChange} type='text' />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        <strong>Add a photo</strong>
                    </Form.Label>
                    <div class="custom-file">
                    <input type="file" name="image" accept="image/*" onChange={this.onImageChange}/>
                  </div>
                </Form.Group>
                <Button style={{backgroundColor: "green", border: "1px solid green"}} onClick={this.handleImageUpload}>
                  Upload
                </Button>
                <br />
                <br />
                <Button style={{backgroundColor: "green", border: "1px solid green"}} type='submit'>
                 Save changes
                </Button>
                <a href='/company' style={{ marginLeft: '15px' }}>
                  Cancel
                </a>
                </Form>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }

//   updateRestaurant.propTypes = {
//     getRest: PropTypes.func.isRequired,
//     updateRest: PropTypes.func.isRequired,
//     user: PropTypes.object.isRequired,
//     status: PropTypes.object.isRequired
//   }
  
//   const mapStateToProps = state => { 
//       return ({
//       user: state.restProfile.user,
//       status: state.restProfile.status
//   })};
  
//   export default connect(mapStateToProps, { getRest, updateRest })(updateRestaurant);
export default updateCompany;