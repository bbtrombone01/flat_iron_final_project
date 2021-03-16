const initialState = {
    message: ""
}


const loginSignUpReducer = (state = initialState, action) => {
//    debugger
    switch (action.type) {
       case "ERROR_MESSAGE":
           return{
               ...state,
               message: action.payload
           }
       default:
           return state
   }
}

export default loginSignUpReducer
