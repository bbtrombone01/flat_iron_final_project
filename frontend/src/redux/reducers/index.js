import {combineReducers} from "redux"
import characterReducer from "./characterReducer"
import loginSignUpReducer from "./loginSignUpReducers"
import viewMapReducer from "./viewMapReducer"
import createNotesReducer from "./noteReducer"
import noteArrayReducer from "./noteArrayReducer"
import editNoteReducers from "./editNoteReducers"

const rootReducer = combineReducers({characterReducer,loginSignUpReducer, viewMapReducer,createNotesReducer, noteArrayReducer, editNoteReducers})


export default rootReducer