const initialState = {
    arrayofNoteObjects: []
}


const noteArrayReducer =(state = initialState, action) =>{

    switch (action.type) {
        case "UPDATENOTE":
            return {
                ...state,
                arrayofNoteObjects: action.payload
            }
        case "CONCATARRAY":
            return{
                ...state,
                arrayofNoteObjects: state.arrayofNoteObjects.concat(action.payload)
            }
        case "MAKENOTEVISABLE":

            return{
                ...state,
               arrayofNoteObjects: state.arrayofNoteObjects.map((e) => {
                if(e.id === action.payload){ 
                        e.visibility = "visible"
                    return e
                } else {
                    return e;
                }})}
        
        case "HIDENOTE":

            return{
                ...state,
                arrayofNoteObjects: state.arrayofNoteObjects.map((e) => {
                    if(e.id === action.payload){ 
                            e.visibility = "hidden"
                        return e
                    } else {
                        return e;
                    }})
            }
        case "EDITARRAYOFNOTEOBJECTS":

        return{
                ...state,
                arrayofNoteObjects: state.arrayofNoteObjects.map( (e) =>{
                    if(e.id === action.payload.id){
                         e = action.payload
                        return e
                    }else {
                        return e
                    }
                })
            }

        case "REMOVEDELTEDNOTE":
            // debugger

            // test = state.arrayofNoteObjects.filter( note => note != action.payload )
        return{
            ...state,
            arrayofNoteObjects: state.arrayofNoteObjects.filter( note => note !== action.payload )
        }
        
    
        default:
           return state
    }
}

export default noteArrayReducer