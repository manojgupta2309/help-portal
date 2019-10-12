const workflowData= []

export const workflowReducer = (state = workflowData , action)=>{
    switch(action.type){
        case "Get_Workflows" : return action.payload   
        case "Add_Workflow": return [...state,action.payload]     
        case "Delete_Workflow" : let idx= state.findIndex((e)=>e._id===action.payload)
                                return [...state.slice(0,idx),...state.slice(idx+1)]
        case "Update_Workflow" : let dx= state.findIndex((e)=>e._id===action.payload.id)
                                return [...state.slice(0,dx),action.payload,...state.slice(dx+1)]                        
       default : return state;          
    }
}
const logData=[]
export const logReducer = (state = logData , action)=>{
    switch(action.type){
       case "Get_Logs" : return action.payload  
       case "Delete_Log": 
                        let idx= state.findIndex((e)=>e._id===action.payload)
                        return [...state.slice(0,idx),...state.slice(idx+1)]    
            
       default : return state;         
    }
}
const authState={
    isAuth:!!sessionStorage.getItem("username")
}
export const authReducer=(state = authState , action)=>{
    return state;    
}
