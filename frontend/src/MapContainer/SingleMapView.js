import React from "react"
import {connect} from "react-redux"
import { mapsReatlivePath, startNoteCreation,editSingleNoteName , editSingleNoteDescription, updateNoteArrayState,addNoteArrayState, endNoteCreation } from "../redux/actions"
import SingleNote from "../SingleNoteView"

class SingleMap extends React.Component{

    // need to take away border solid after we make sure everthing works 
    // need to make the create map form nicer 

    // fecthes a map based of the the selected map and all notes that belong to that map
    componentDidMount(){
        Promise.all([
            fetch(`http://localhost:3000/maps/${this.props.selectedMap}`, {headers: {Authorization: `Bearer ${sessionStorage.token}`}}).then( res => res.json()),
            fetch( `http://localhost:3000/notes/${this.props.selectedMap}`,{headers: {Authorization: `Bearer ${sessionStorage.token}`}}).then( res=> res.json())
        ])
        .then ( ([fetchedmapsData, fetchedNotesData]) =>  [this.props.mapsReatlivePath(fetchedmapsData), this.props.updateNoteArrayState(fetchedNotesData)])
    }

    // takes the event.PageX and Y ans uses them to fill to find the top and left value, keep in x y order beacuse that is the order the playload expects to get them  
    noteCreationInfo =(event)=>{
        if(event.target.className === "MasterDiv"){
            this.props.startNoteCreation(event.pageX-25, event.pageY-25)
        }
    }

    // creats post request for the rails backend  
    postNoteRequest =(event)=>{
        // debugger
        console.log("test")
        event.preventDefault()
        // post creates a note object using all of the state from createNotesReducer, needs the map_id from selectedMap
        let postNote = {
            border: this.props.newNoteStyles.border,
            cursor: this.props.newNoteStyles.cursor,
            description: this.props.newNoteStyles.description,
            height: this.props.newNoteStyles.height,
            left: Number(this.props.newNoteStyles.left),
            map_id: Number(this.props.selectedMap),
            name: this.props.newNoteStyles.name,
            position: this.props.newNoteStyles.position,
            top: Number(this.props.newNoteStyles.top),
            width: this.props.newNoteStyles.width, 
            visibility: "hidden"  
        }
        fetch(`http://localhost:3000/notes`,{
            method: "POST",
            body: JSON.stringify(postNote),
            headers: {
                Authorization: `Bearer ${sessionStorage.token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        // takes the state of arrayOfNoteObjects and concats that data to that array 
        .then( data => this.props.addNoteArrayState(data),this.props.endNoteCreation())
    }

    // stops event from bubbling up to submit form 
    handleClick =(event)=>{
        event.stopPropagation()
    }

    // edits the name value of the createNotesReducer 
    editName =(event)=>{
        this.props.editSingleNoteName(event.target.value)
    }

        // edits the descritpion value of the createNotesReducer
    editDescription =(event)=>{
        this.props.editSingleNoteDescription(event.target.value)
    }
    
    render(){
        // maps over each item in the arryOfAllNotes and passed them as props to SingleNotes, this should render all the notes on the page
        let showAllNotes = this.props.arrayOfAllNotes.map( note =><SingleNote props={note} key={note.id} /> )
        return(
            <div onClick={this.noteCreationInfo} className="MasterDiv" 
            style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundImage: `url(http://localhost:3000/${this.props.mapsRealtivePath}`,
                backgroundPosition: "center center",
                backgroundSize: "100% 100%"
            }}>
                {showAllNotes}
                <div>


                <div 
                        style={{
                            visibility: `${this.props.newNoteStyles.visibility}`,
                            position: "fixed",
                            width: "100%",
                            height: "100vh",
                            top: "0",
                            left: "0",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }} 
                        // className={"noteCreationForm"}
                        >

                        <form onSubmit={(event) =>this.postNoteRequest(event) } onClick={(event)=>this.handleClick(event)} 
                            style={{
                                position: "relative",
                                backgroundColor: "white",
                                width: "20%",
                                wordWrap: "break-word",
                                padding: "1%"
                            }}>
                            <label> name </label>
                            <br />
                            <input type="text" name="name" onChange={ (event) =>this.editName(event)}></input>
                            <br />
                            <label> description</label>
                            <br />
                            <input type="text" name="description" onChange={ (event) => this.editDescription(event)} />
                        <button>submit</button>
                        <button type="button" onClick={this.props.endNoteCreation} >cancel</button>
                </form>







                </div>





                </div>
            </div>
        )
    }
}

const mapStateToProps =(state)=>{
    // selectedMap is the id of the map the user clicked on 
    // mapsRealtivePath is the realtivepath of the map image, needs url(http://localhost:3000/ to render to the screen 
    // newNoteStyles is the css properies that will be passed as props to singleNoteView.
    // arrayOfAllNotes all of the notes connected to a map, these will get mapped over and render to the page in showAllNotes
    return{
        selectedMap: state.viewMapReducer.selectedMapId,
        mapsRealtivePath: state.viewMapReducer.mapsReatlivePath.image,
        newNoteStyles: state.createNotesReducer,
        arrayOfAllNotes: state.noteArrayReducer.arrayofNoteObjects,
    }
}

export default connect(mapStateToProps,({mapsReatlivePath, startNoteCreation, editSingleNoteName, editSingleNoteDescription, updateNoteArrayState, addNoteArrayState, endNoteCreation}))(SingleMap)