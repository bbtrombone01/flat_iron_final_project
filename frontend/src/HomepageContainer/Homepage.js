import React from "react"
import {connect} from "react-redux"
import {mapsArray, selectedMap} from "../redux/actions/HomepageAction"
import GameViewCard from "./GameViewCard"
import "./homepage.css"
import NavBAr from "../NavBar"

class Home extends React.Component{

    // fetches an array of all of the maps 
    //mapsArray sets State arrayOfAllMaps 
    componentDidMount(){
        fetch("http://localhost:3000/maps",{
            headers: {
                Authorization: `Bearer ${sessionStorage.token}`
            }
        })
        .then( res => res.json())
        .then (data => this.props.mapsArray(data))
    }

    // clears session stroage, 
    // since sesssion stroage is no longer true the user is push back to login

    logOut =()=>{
        sessionStorage.clear()
    }

    // selectedMap sets selectedMapId to whatever the id is, 
    // the id should be the maps id since it is proved as a prop for showAllMap
    // sends the user to the viewpage for whatever map the clicked on 
    getMapId =(event)=>{
       this.props.selectedMap(event.target.parentElement.id)
       this.props.history.push(`/map`)
    }
    
    render(){
        // maps over all of the objects in arrayOfAllmays to provode GameViewCard with a name, id, and onClick event for each object
        const showAllMaps = this.props.arrayOfAllMaps.map(element =><GameViewCard key={element.id} name={element.name} id={element.id} clickEvent={this.getMapId}/>)
        return(
            <div className="homepage">
                <NavBAr />
                {showAllMaps}
            </div>
        )
    }
}
   const mapStateToProps =(state)=>{
        return{
            arrayOfAllMaps: state.viewMapReducer.arrayOfAllMaps
        }
    }

export default connect(mapStateToProps,({mapsArray, selectedMap}))(Home)