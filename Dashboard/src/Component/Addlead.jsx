import React, { Component, Fragment,useState } from 'react'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import LeaderData from './LeaderData'


export default class Addlead extends Component {
   
    
    constructor(props){
        super(props);
            this.state = {
                show : false,
                first_name : "",
                last_name : "",
                email: "",
                mobile : "",
                location_type : "",
                location_string : ""

            }
            
            this.handleChange = this.handleChange.bind(this)
            this.handleShow = this.handleShow.bind(this)
            this.handleClose = this.handleClose.bind(this)
            this.handleonSubmit = this.handleonSubmit.bind(this);

        
    }
    
    handleShow(){
        this.setState({show:true});
    }
    handleClose(){
        this.setState({show:false});
    }
    handleChange(event){ 
       
      this.setState({ 
    
        [event.target.name] : event.target.value 
      }) 
    } 

    handleonSubmit(){
        console.log("Testing")
        const data = { first_name: this.state.first_name,last_name : this.state.last_name,mobile: this.state.mobile,email:this.state.email,location_type:this.state.location_type,location_string : this.state.location_string  };
    
        fetch('http://3.91.0.48:4060/api/leads/', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        this.setState({show:false});
    }
    render() {
        const isEnabled = this.state.email.length > 0 && this.state.location_string.length > 0 && this.state.location_type.length && this.state.first_name.length && this.state.mobile>0 && this.state.last_name;
  const mystyle = {
    color: "white",
    backgroundColor: "black",
    padding: "10px",
    fontFamily: "Arial",
    marginLeft : "20px",
    marginTop : "20px"
  };
  const styleFormLabel = {
    marginLeft : "150px",
    textAlign : "center"
    
}
const styleFormInput = {
    marginLeft : "50px"
}
      
        return (
           <Fragment>
              <button style={mystyle}  onClick={this.handleShow} className="add_lead_modal_btn">Add Lead</button>
     
     <form>
     <Modal show={this.state.show} onHide={this.handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>Add Lead</Modal.Title>
         </Modal.Header>
         <Modal.Body>
         
         <div>
                <label >First Name <span style= {{color : "red"}}>*</span></label>
                <label style= {styleFormLabel}>Last Name <span style= {{color : "red"}}>*</span></label>
                <input  name="first_name" placeholder="First Name" value={this.state.first_name}  onChange={this.handleChange} required ></input>
                <input name="last_name" placeholder="Last Name" style={styleFormInput} value={this.state.last_name}  onChange={this.handleChange} required ></input>
                </div>
                <div style={{marginTop : "20px"}}>
                <label>Email Address <span style= {{color : "red"}}>*</span></label>
                <label style= {styleFormLabel}>Mobile <span style= {{color : "red"}}>*</span></label>
                <input type="email" name="email" value={this.state.email}  onChange={this.handleChange}  placeholder="Email" required></input>
                <input style={styleFormInput} name="mobile" value={this.state.mobile}  onChange={this.handleChange}  placeholder="Mobile No." required></input>
                </div>
                <div>
                <label>Location Type <span style= {{color : "red"}}>*</span></label>
                
                <label style= {styleFormLabel}>Location String <span style= {{color : "red"}}>*</span></label>
                
                <select value= {this.state.location_type} onChange={this.handleChange} style= {{width : "188px"}} name="location_type" required>
                     <option></option>
                     <option >City</option>
                     <option >State</option>
                     <option >Country</option>
                 </select>
                <input style={{marginLeft:"50px"}} name="location_string" value={this.state.location_string}  onChange={this.handleChange}   placeholder="Location String" required ></input>
                </div>
         </Modal.Body>
         
         <Modal.Footer>
         
         <button style={mystyle}  onClick={this.handleClose}>Close</button>
         <button style={mystyle} onClick={this.handleonSubmit} disabled={!isEnabled}>Save</button>       
         </Modal.Footer>
       </Modal>
     </form>
     <LeaderData locationType={this.state.location_string} /> 
     
    
           </Fragment>
        )
    }
}
