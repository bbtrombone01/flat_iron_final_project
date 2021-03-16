import React from "react"
import NavBar from "../NavBar"
import "./mapAndNote.css"
import {connect} from"react-redux"
import {concatArrayOfAllMaps} from "../redux/actions/index"
class Map extends React.Component{

    // creates FormData object for post request 
    submitMap =(event)=>{
        event.preventDefault()
       let mapFormData =  new FormData(event.target)
        this.postMap(mapFormData)
        debugger
    }
    
    // make new map on back end, sends user back to home page after response  
    postMap =(data)=>{
        fetch('http://localhost:3000/maps',{
            method: "POST",
            body: data,
            headers: {
                Authorization: `Bearer ${sessionStorage.token}`
            }
        })
        .then(res => res.json())
        .then( data => this.sendBackHome(data))
    }
        // concats the data to the arrayOfAllMaps
    sendBackHome =(data)=>{
        this.props.concatArrayOfAllMaps(data)
        this.props.history.push("/homepage")
    }



    render(){
        return(
            <div className ="mapCreatePage">
                <NavBar />
                <form onSubmit={this.submitMap} className="createMapForm">
                    <label className="labelA"> submit a map</label>
                    <br />
                    <label className="labelA">name </label>
                    <input type="text" name="name"/>
                    <br />
                    <input type="file" name ="image"/>
                    <br />
                    <button>create game</button>
                </form>
            </div>
        )
    }

}



export default connect(null,{concatArrayOfAllMaps})(Map) 