import React, { Component,useState } from 'react'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

export default class MarkUpdate extends Component{
   constructor(props){
       super(props);
       this.state = {
                show : false,
                communication : ""
       }
       this.handleShow = this.handleShow.bind(this)
      this.handleClose = this.handleClose.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleonSubmit = this.handleonSubmit.bind(this)
   }
   
   handleonSubmit(){
    const data = { communication : this.state.communication};

    fetch('http://3.91.0.48:4060/api/mark_lead/' + this.props.index, {
      method: 'PUT', // or 'PUT'
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

 
handleShow(){
    this.setState({show:true});
}
handleClose(){
    this.setState({show:false});
}
handleChange(event){ 
    console.log(event.target.value);
  this.setState({ 

    [event.target.name] : event.target.value 
  }) 
} 
render() {
    const mystyle = {
        color: "white",
        backgroundColor: "black",
        
      };
    return(
        <>
    <button style={mystyle}  onClick={this.handleShow}>Mark Update</button>
     

      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Mark Communication </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Communication</label>
          <textarea name="communication" rows="5" cols="60" onChange={this.handleChange} required  ></textarea>
        </Modal.Body>
        <Modal.Footer>
        <button style={mystyle}  onClick={this.handleClose}>Close</button>
        <button style={mystyle}  onClick={this.handleonSubmit} disabled={!this.state.communication}>Save</button>       
        </Modal.Footer>
       
      </Modal>
      </>

    )
}
}

