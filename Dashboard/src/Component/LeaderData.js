import React, { Component } from 'react'
import MarkUpdate from './MarkUpdate';
import DeleteBtn from './DeleteBtn';

export default class LeaderData extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchData : null
        }
    }
 
    
    componentDidMount() {
        console.log("hello World")
        console.log(this.props.locationType)

        fetch("http://3.91.0.48:4060/api/leads/?location_string=" + this.props.locationType).then ((data) => {
            data.json().then((resp) => {
                console.log(resp)
                if(resp.length>0){
                this.setState({searchData:resp})

                }
                
            })
        })
    }
    render() {
        const styleTable = {
            border: "1px solid black",
            width: "100%",
            marginTop : "20px",
            marginLeft: "20px"
        }
       
        return (
            <>
                <table style={styleTable} className="leads_table">
                <thead>
                <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile Num</th>
                        <th>Location Type</th>
                        <th>Location String</th>
                        <th>Action</th>
                    </tr>
                </thead>
                    
                    {
                       this.state.searchData?
                        <> {
                            this.state.searchData.map((item) => 
                            <tbody>
                            <tr key={item.id}> <td> {item.first_name + item.first_name} </td>
                             <td> {item.email} </td>
                             <td> {item.mobile} </td>
                             <td>{item.location_string}</td>
                             <td>{item.location_type}</td>
                            <td><MarkUpdate index={item.id} /> <DeleteBtn index={item.id}/>  </td>
                            
                            
                            </tr>
                            </tbody>
                            )

                       }
                       </>
                       :""

                   }
                   
                       
                      
                 
                  
                </table>
            </>
        )
    }
}
