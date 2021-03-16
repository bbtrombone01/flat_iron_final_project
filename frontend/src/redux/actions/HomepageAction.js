export const mapsArray  = (info) =>{
    return{
        type: "ARRAYOFNOTES",
        payload: info
    }
}

export const selectedMap =(info) =>{
    return{
        type: "SELECTEDMAP",
        payload: info 
    }
}