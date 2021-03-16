import React from "react"
import {connect} from "react-redux"
import {editClickedNote,makeNoteVisable,hideNote,editNotesName,editNoteArrayObjects, removeDeletedNoteFromState} from "./redux/actions/index"

 class SingleNote extends React.Component{


    state = {
        name: this.props.props.name,
        description: this.props.props.description
    }


    handleClick =(event)=>{
        event.stopPropagation()
    }

    // create a editExsitingNoteReducer, 
    // user should be able to edit note from that form
    // user should be able to delete notes from here as well. 

    // changes the visibility user should click on div to make it visible
    showNoteOnPage =(event)=>{
            this.props.makeNoteVisable(this.props.props.id)
        }

 // changes the visibiltiy of the note to hidden and sets state back to props value
 // when the opens the note again it should have the default values 
    hideNoteFromView =()=>{
        this.props.hideNote(this.props.props.id)
        this.setState({
            ...this.state,
            name: this.props.props.name,
            description: this.props.props.description
        })
    }

    // sets the state of the input tags name to be the value of the event
    updateNoteInfo =(event)=>{
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        })
    }
    //  creates the pacth notes data, calls for the patch request
    createPatchNoteData =(event)=>{
        event.preventDefault()
      let   patchedNoteData ={
            name: this.state.name,
            border: this.props.props.border,
            cursor: this.props.props.cursor,
            description: this.state.description,
            height: this.props.props.height,
            id: this.props.props.id,
            left: this.props.props.left,
            map_id: this.props.props.map_id,
            position: this.props.props.position,
            top: this.props.props.top,
            user_id: this.props.props.user_id,
            visibility: "visible",
            width: this.props.props.width
        }
            // debugger
        this.patchNoteRequest(patchedNoteData)
    }

    // makes a patch request 
    // editNoteArrayObjecst maps over state.noteArrayReducer.arrayOfNoteObjects and replaces 
    // the note with the id === this.props.props.id with the patch response 
    patchNoteRequest =(patchedNoteData)=>{
        console.log("this")
        fetch(`http://localhost:3000/notes/${String(this.props.props.id)}`,{
            method: "PATCH",
            body: JSON.stringify(patchedNoteData),
            headers: {
                Authorization: `Bearer ${sessionStorage.token}`,
                "Content-Type": "application/json"
            }})
        .then(res => res.json())
        .then(data => this.props.editNoteArrayObjects(data))
    }


    // makes a destroy request pass data to checkDeleteResponse 
        destoryNote =()=>{
            fetch(`http://localhost:3000/notes/${String(this.props.props.id)}`,{
                method: "DELETE",
                headers:{
                    Authorization: `Bearer ${sessionStorage.token}`
                } 
            }).then( res => res.json())
            .then(data => this.checkDeleteResponse(data))
        }

        // removes deleted note from state by filtering out all notes that are eqaul to this.props,props
        checkDeleteResponse =(data)=>{
            if(data["succes"]){
               this.props.removeDeletedNoteFromState(this.props.props)
            }
        }

   render(){
    //    debugger
       return(
               <div onClick={(event) =>this.showNoteOnPage(event)} className="test"
               style={{
                //    border: `${this.props.props.border}`,
                   cursor: `${this.props.props.cursor}`,
                   height: `${this.props.props.height}`,
                   position: `${this.props.props.position}`,
                   width: `${this.props.props.width}`, 
                   left: `${Math.floor(this.props.props.left/window.innerWidth*100).toString()+"%"}`,
                   top: `${Math.floor(this.props.props.top/window.innerHeight*100).toString()+"%"}`
               }}>
                <div onClick={this.handleClick}
                style={{
                    visibility: this.props.props.visibility,
                    position: "fixed",
                    width: "100%",
                    height: "100vh",
                    top: "0",
                    left: "0",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>

                <form onSubmit={(event)=>this.createPatchNoteData(event)}
                    style={{
                        position: "relative",
                        backgroundColor: "white",
                        width: "20%",
                        wordWrap: "break-word",
                        padding: "1%"
                    }}>
                    <label> name</label>
                    <br />
                    <input  name="name" value={this.state.name} onChange={(event)=>this.updateNoteInfo(event)} />
                    <br />
                    <label>description</label>
                    <br />
                    <input  name="description" value={this.state.description} onChange={(event)=>this.updateNoteInfo(event)} />
                    <button> edit</button>
                    <button type="button" onClick={this.destoryNote}> delete</button>
                    <button type="button" onClick={this.hideNoteFromView}>close</button>
                </form>
                </div>
           </div>
       )
   } 
}

    const mapStateToProps =(state)=>{
        return{

            arrayOfAllNotes: state.noteArrayReducer.arrayofNoteObjects
        }

    }
export default connect(mapStateToProps,{editClickedNote,makeNoteVisable,hideNote,editNotesName,editNoteArrayObjects,removeDeletedNoteFromState} )(SingleNote)