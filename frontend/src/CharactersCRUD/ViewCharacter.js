import React from "react"
import {connect} from "react-redux"
import {characterList, characterShow} from "../redux/actions/index"
import {Link} from 'react-router-dom'
import SingleCharacter from "./singleCharacter"
import NavBar from "../NavBar"


class ViewCharacter extends React.Component{

    // featches all of the character that the user has created 
    componentDidMount(){
        fetch("http://localhost:3000/characters",{
            headers: {
                Authorization: `Bearer ${sessionStorage.token}`
            }
    }).then( res => res.json())
    .then( data => this.props.characterList(data))
}

    // sends user to the characters page they clicked on 
    //clickedcharacter is used for the fetch request
    sendToCharacterShowPage = (event)=>{
        this.props.characterShow(parseInt(event.currentTarget.id))
        this.props.history.push("/charactereditor")
    }

    render(){
        // maps across all of the characters in arrayof All charcters and renders them to the screen 
        const showAllCharacters = this.props.arrayofAllCharacters.map( element =><SingleCharacter character={element} key={element.id} clickevent={this.sendToCharacterShowPage} />)
        return(
            <div className="CharactersPage" >
                <NavBar />
                {showAllCharacters}
                <Link to="/character_creation">
                <button>  make a new character </button>
                </Link>
            </div>
        )
    }
}

// arrayOfAll charcters is to feed an array so it can be maped over for show characters 
// clickedCharacters is to get the id of what ever character is clicked on
const mapStateToProps = (state) =>{
    return {
        arrayofAllCharacters: state.characterReducer.arrayofAllCharacters,
        clickedCharacterID: state.characterReducer.characterId
    }
}

export default connect(mapStateToProps,({characterShow ,characterList}))(ViewCharacter)