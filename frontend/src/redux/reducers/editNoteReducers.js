const initialState ={
    name: "",
    description: "",
}

const  editdNotesReducer = (state=initialState, action)=>{
    switch (action.type) {
        case "EDITNOTENAME":
            return{
                ...state
            }

        default:
            return state
    }
}

export default editdNotesReducer