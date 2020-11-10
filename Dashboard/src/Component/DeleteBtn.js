import React, { Component } from 'react'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

export default class DeleteBtn extends Component{
    constructor(props){
        super(props);
        this.state = {
                 show : false
        }
        this.handleShow = this.handleShow.bind(this)
       this.handleClose = this.handleClose.bind(this)
       this.onSubmit = this.onSubmit.bind(this)
    }
    
  
 handleShow(){
     this.setState({show:true});
 }
 handleClose(){
     this.setState({show:false});
 }
onSubmit(){
    console.log("Arpit")
    console.log(this.props.index)
    fetch('http://3.91.0.48:4060/api/leads/' + this.props.index  + '/', {
        method: 'DELETE',
      })
      .then(res => res.text()) // or res.json()
      .then(res => console.log(res))
      this.setState({show:false});
 }
render(){
    const mystyle = {
        color: "white",
        backgroundColor: "black",
        
      };
    return(
        <>
    <button style={mystyle}  onClick={this.handleShow}>Delete</button>
     

      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you wish to delete this lead ? </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <button style={mystyle} onClick={this.onSubmit} >Delete</button>
        <button style={mystyle} onClick={this.handleClose} >Cancel</button>
        </Modal.Body>
       
      </Modal>
      </>
    )
}
}


