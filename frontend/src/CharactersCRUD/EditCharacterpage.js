import React from "react"
import {connect} from 'react-redux'
import {characterEdit} from "../redux/actions/index"
import Navbar from "../NavBar"

class CharacterEditor extends React.Component{

// fetches character data, character id should be updated when the user clicks on a character in the viewCharcter page 
// that data is passed to characterEdit which takes that data and updates CharacterReducer.selected 
    componentDidMount(){
        fetch(`http://localhost:3000/characters/${this.props.characterId}`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.token}`
            }
        })
        .then(res => res.json())
        .then(data => this.props.characterEdit(data))
    }

    // when the changes the info in form, this updates selectedcharacter to match input, does not save to database 
    updateSelectedCharacterInfo =(event)=>{
        const edits ={
            ...this.props.selectedCharacterInfo,
            [event.target.name]: event.target.value,
        }
    this.props.characterEdit(edits)
    }

    // creates form data object passes it on for post request
    characterEditFormdata =(event)=>{
        event.preventDefault()
        let editCharacterFormData = new FormData(event.target)
        editCharacterFormData.append( "user_id", this.props.selectedCharacterInfo.id)
        this.postCharacterEdit(editCharacterFormData)
    }
 
    // post Character edits to the data base 
    postCharacterEdit=(formData)=>{
        fetch(`http://localhost:3000/characters/${String(this.props.characterId.to_s)}`,{
            method: "PATCH",
            body: formData,
            headers: {
                Authorization: `Bearer ${sessionStorage.token}`
            }
        })
        .then( res => res.json())
        .then()
    }
        // deletes charcter from the data base, sends data to checkDeleteResponse 
    deleteCharcters =()=>{
        // debugger
        fetch(`http://localhost:3000/characters/${String(this.props.characterId)}`,{
            method: "DELETE",
                headers:{
                    Authorization: `Bearer ${sessionStorage.token}`
                } 
        }).then( res => res.json())
        .then( data => this.checkDeleteResponse(data))
    }

    checkDeleteResponse =(data)=>{
        // debugger
        if(data["succes"]){
          this.props.history.push("/view_character")
        }
    }

    render(){
        return(
            <div className="CharactersPage">
                <Navbar />
                <form onSubmit={(event) =>this.characterEditFormdata(event)} className="createCharactForm">
                <label className="labelA" > name</label>
                <input type="text" name="name" value={this.props.selectedCharacterInfo.name} onChange={ (event)=> this.updateSelectedCharacterInfo(event)}/>
                <label className="labelA"> description</label>
                <input type="text" name="description" value={this.props.selectedCharacterInfo.description} onChange={ (event)=> this.updateSelectedCharacterInfo(event)} />
                <br />
                <button> submit</button>
                <button type="button" onClick={this.deleteCharcters}> delete</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    // characterId needed for fetch request for character data
    // selectedCharacterInfo used for displaying info in the form 
    return {
        characterId: state.characterReducer.characterId, 
        selectedCharacterInfo: state.characterReducer.selectedCharacter
    }
}
export default connect(mapStateToProps, {characterEdit})(CharacterEditor)