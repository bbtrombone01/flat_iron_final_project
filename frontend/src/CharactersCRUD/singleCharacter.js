import React from "react"
import "./CharactersContainer.css"

const singleCharacter = (props)=>{
  
  // shows all of the charcters information in a card format
  // props should return an id, name, description, and clickevent, 
  return(
    <div className="CharacterChards" onClick={props.clickevent} id={props.character.id}>
      <form >
          <p> name</p>
          <label type="name">{props.character.name}</label>
          <p> description </p>
          <label>{props.character.description}</label>
      </form>
    </div>
    )
}

export default singleCharacter