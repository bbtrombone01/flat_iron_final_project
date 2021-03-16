import React from "react"
import "./homepage.css"

class GameViewCard extends React.Component{

    // using state instead of redux until i can figure out 
    // how to get all of the maps to send down urls 
    
    state = {
        imgUrl: ""
    }

    // only needed untill maps sends down imag realtive path
    componentDidMount(){
        // debugger
        fetch(`http://localhost:3000/maps/${this.props.id}`, {
        headers: 
            {Authorization: `Bearer ${sessionStorage.token}`}
        })
        .then( res => res.json())
        .then(data => this.setImgUrl(data))
    }
    
    // changes the state of  imgUrl
        setImgUrl =(data)=>{
            this.setState({
                imgUrl: data.image
            })
        }
    
    render(){
        // pictures are being held on disc right now 
        // if switched to another hosting service please change img scr
        return(
            <div id={this.props.id} onClick={(event)=>this.props.clickEvent(event)} className="gamecards">
               <h1 className="gameCardH1"> {this.props.name}</h1>
               <img src={`http://localhost:3000`+ this.state.imgUrl} alt="sorry"/>
            </div>
        )
    }
}

export default GameViewCard