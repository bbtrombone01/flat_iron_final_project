const initialState = {
    characterId: 0,
    arrayofAllCharacters: [],
    selectedCharacter: {}
}

const characterReducer =(state = initialState, action) =>{
    switch (action.type) {
        case "CHANGE_CHARACTERS":
                return {
                    ...state,
                    arrayofAllCharacters: action.payload
                }  
                
        case "CHARACTER_ID":
            return{
                ...state,
                characterId: action.payload
            }
        case "CHARACTER_EDIT":
            return{
                ...state,
                selectedCharacter: action.payload
                
            }

            case "CONCATMAPARRAY":
                debugger
                return{
                    ...state,
                    
                }
        default:
            return state
    }

}

export default characterReducer