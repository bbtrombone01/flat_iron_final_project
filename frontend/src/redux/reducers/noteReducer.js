const initialState = {
    left: 0,
    top: 0,
    height: "50px",
    width: "50px",
    border: "solid",
    cursor: "pointer",
    position: "fixed",
    visibility: "hidden",
    name: "",
    description: ""
}

const createNotesReducer = (state = initialState, action)=>{
    switch (action.type) {
       
    
        case "STARTNOTECREATE":
            // debugger
            return {
                ...state,
                top: action.payloadY,
                left:action.payloadX,
                visibility: "visible"
            }
        
        case "NAMEEDIT":
            // debugger

                return{
                    ...state,
                    name: action.payload
                }
        case "DESCRIPTIONEDIT":
                return{
                    ...state,
                    description: action.payload
                }
            
        case "RESETNOTE":
            // debugger
                return{
                    ...state,
                    top: 0,
                    left: 0,
                    visibility: "hidden",
                    name: "",
                    description: ""
                }
        default:
            return state
    }

}


export default createNotesReducer