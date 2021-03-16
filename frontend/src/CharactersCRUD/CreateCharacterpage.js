import React from "react"
import NavBar from "../NavBar"

class Character extends React.Component{

    // create FormData object  for post request 
    createCharacter =(event)=>{
        event.preventDefault()
        let characterFormData = new FormData(event.target)
        this.postCharacter(characterFormData)
    }

    //  creates new charater on the back end 
    // calls sendToView to push the user back to view characters page 
    postCharacter= (data)=>{
        fetch("http://localhost:3000/characters",{
            method: "POST",
            body: data,
            headers: {
                Authorization: `Bearer ${sessionStorage.token}`
            }
        })
        .then( res => res.json())
        .then(this.sendToView)
    }

    // send user bacl the the view  characters page 
    sendToView =()=>{
        this.props.history.push("/view_character")
    }

    render(){
        return(
            <div className="CharactersPage">
                <NavBar />
                 <form onSubmit={this.createCharacter} className="createCharactForm">
                    <h3>Charcter Creation</h3>
                    <label className="labelA"> name</label>
                    <input type="text" name="name" />
                    <br />
                    <label className="labelA"> description </label>
                    <textarea name="description"/>
                    <br />
                    <br />
                    <button>create your character</button>
                </form>
            </div>
        )
    }
}

export default Character