export const characterList = (info) =>{ 
    return { 
        type: "CHANGE_CHARACTERS",
        payload: info 
    }
}

export const characterShow = (info) =>{
    return {
        type: "CHARACTER_ID",
        payload: info
    }
}

export const characterEdit = (info) =>{
    // debugger
    return{
        type: "CHARACTER_EDIT",
        payload: info
    }
}

export const mapsReatlivePath = (info)=>{
    return{
        type: "SHOWMAP",
        payload: info
    }
}

export const startNoteCreation = (prop1,prop2)=>{
    // debugger
    return{
        type: "STARTNOTECREATE",
        payloadX: prop1,
        payloadY: prop2
        
    }
}

export const editSingleNoteName =(info)=>{
    // debugger
    return{
        type: "NAMEEDIT",
        payload: info,
        // payloadDescritption: prop2
    }
}

export const editSingleNoteDescription =(info)=>{
    return{
        type:"DESCRIPTIONEDIT",
        payload: info
    }
}

export const updateNoteArrayState = (info) =>{
    return{
        type: "UPDATENOTE",
        payload: info
    }
}

export const addNoteArrayState = (info) =>{
    return{
       type: "CONCATARRAY",
        payload: info 
    }
}

export const endNoteCreation =() =>{

    return{
        type: "RESETNOTE"
    }
}

export const editClickedNote =(info)=>{
    debugger
    return{
        type: "DEFAULT",
        payload: info 
    }
}

export const makeNoteVisable =(info)=>{
        return{
            type: "MAKENOTEVISABLE",
            payload: info
        }
}

export const hideNote =(info)=>{
    return{
        type: "HIDENOTE",
        payload: info
    }
}

export const editNotesName =(info)=>{
    return{
        type: "EDITNOTENAME",
        payload: info
    }
}

export const editNoteArrayObjects =(info)=>{
    // debugger
    return{
        type: "EDITARRAYOFNOTEOBJECTS",
        payload: info
    }
}

export const removeDeletedNoteFromState =(info)=>{
    
    return{
        type: "REMOVEDELTEDNOTE",
        payload: info
    }
}

export const concatArrayOfAllMaps =(info)=>{
    return{
        type: "CONCATMAPARRAY",
        payload: info
    }
}