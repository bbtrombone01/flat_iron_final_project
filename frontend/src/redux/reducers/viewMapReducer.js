const initialState = {
    arrayOfAllMaps: [],
    selectedMapId: 0,
    mapsReatlivePath: ""
}

const mapAndNotesReducer =( state = initialState, action)=>{
    switch (action.type) {
        case "ARRAYOFNOTES":
            return{
                ...state,
                arrayOfAllMaps: action.payload
            }  
            
        case "SELECTEDMAP":
            return{
                ...state,
                selectedMapId: action.payload
            }

        case "SHOWMAP":
            return{
                ...state,
                mapsReatlivePath: action.payload
            }
        default:
            return state
    }
}

export default mapAndNotesReducer